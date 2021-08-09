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

module.exports = router;
