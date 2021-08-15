const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const session = require("express-session");

// GET routes
router.get("/", async (req, res) => {
    const { rows } = await db.query("SELECT * FROM customers");
    res.send(rows);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM customers WHERE cust_id = $1", [id]);

    if (!rows.length) res.status(400).json({ error: "Could not find this user." });
    else res.send(rows[0]);
});

// POST routes
// used to create a customer // TODO: send verification email!
router.post("/", async ({ body }, res) => {
    try {
        const hashedPass = await bcrypt.hash(body.password, 11);
        const queryParams = [body.first_name, body.last_name, body.email, hashedPass];
        const { rows } = await db.query(
            "INSERT INTO customers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4);",
            queryParams
        );
        res.send(rows);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

// used to log in a customer
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { rows } = await db.query(`SELECT * FROM customers WHERE email = $1;`, [email]);

        // throw error if authentication fails
        if (!rows.length) throw "No user with this email exists";

        let validPass = await bcrypt.compare(password, rows[0].password);
        if (!validPass) throw "Password does not match";

        // if auth succeeds, set session variables
        req.session.save(() => {
            req.session.cust_id = rows[0].cust_id;
            req.session.first_name = rows[0].first_name;
            req.session.last_name = rows[0].last_name;
            req.session.email = rows[0].email;
            req.session.loggedIn = true;

            // also set another cookie that frontend can read (no sensitive info)
            const exp = 24 * 60 * 60 * 1000;
            const sessExpiration = JSON.stringify(new Date(Date.now() + exp));
            res.cookie("computerlink-login", sessExpiration, { maxAge: exp });
            res.json({ token: "loggedIn" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: "Login failed!" });
    }
});

// used to log out a customer
router.post("/logout", (req, res) => {
    // destroy session if logged in, otherwise send 404
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            // remove computerlink-login cookie
            // res.cookie("computerlink-login", "1", { maxAge: 0 });
            res.clearCookie("computerlink-login");
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// UPDATE route
router.put("/:id", async ({ body, params }, res) => {
    try {
        // for each valid key-val pair in body, make a string (ie. "email=value, ") and concatenate them all
        let updateString = "";

        // if the body contains a password, hash it
        if (body.password) body.password = await bcrypt.hash(body.password, 11);

        for (const [key, value] of Object.entries(body)) {
            if ( !["email","password"].includes(key) ) continue;
            updateString += `${key}='${value}', `;
        }

        const { id } = params;
        const { rows } = await db.query(
            `UPDATE customers SET ${updateString.slice(0, -2)} WHERE cust_id = $1;`, [id]
        );
        res.send(rows);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

// DELETE route
router.delete("/:id", async (req, res) => {
    try {
        // destroy session if it exists
        if (req.session.loggedIn) req.session.destroy();

        const { id } = req.params;
        const { rows } = await db.query("DELETE FROM customers WHERE cust_id = $1", [id]);

        res.send(rows);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

module.exports = router;
