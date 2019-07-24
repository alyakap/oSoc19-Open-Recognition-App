"use strict";

const pg = require("pg");

const pool = pg.Pool({
  connectionString: "postgres://postgres:postgres@0.0.0.0:5432/open-recognition"
});

const query = async query => (await pool.query(query)).rows;

module.exports = {
  query
};
