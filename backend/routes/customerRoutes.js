const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

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

// POST route
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
