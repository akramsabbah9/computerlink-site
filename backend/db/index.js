const { Pool, Client } = require("pg");

const pool = new Pool();

const client = new Client();

client.connect();

module.exports = {
  query: (text, params) => pool.query(text, params)
};
