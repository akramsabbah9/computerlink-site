const express = require("express");
const router = express.Router();
const db = require("../db");

// GET routes
// test. delete later
router.get("/", async (req, res) => {
    const { rows } = await db.query("SELECT NOW()");
    res.send(rows[0]);
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
        const queryParams = [body.first_name, body.last_name, body.email, body.password];
        const { rows } = await db.query(
            "INSERT INTO customers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4);",
            queryParams
        );
        res.send(rows);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});

// UPDATE route
router.put("/:id", async ({ body, params }, res) => {
    try {
        // for each valid key-val pair in body, make a string (ie. "email=value, ") and concatenate them all
        let updateString = "";

        for (const [key, value] of Object.entries(body)) {
            if ( !["email","password"].includes(key) ) continue;
            // console.log(`${key}: ${value}`);
            updateString += `${key}='${value}', `;
        }

        const queryParams = [ params.id ];

        // note: slice removes the trailing comma
        const { rows } = await db.query(
            `UPDATE customers SET ${updateString.slice(0, -2)} WHERE cust_id = $1;`,
            queryParams
        );
        res.send(rows);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

module.exports = router;
