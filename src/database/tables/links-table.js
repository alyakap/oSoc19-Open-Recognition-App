"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;

const createTable = () => {
  database.query(`
  CREATE TABLE IF NOT EXISTS
    links
    (
      id SERIAL PRIMARY KEY,
      to_user_id INTEGER NOT NULL REFERENCES users (id),
      endpoint TEXT NOT NULL,
      is_view_mode BOOLEAN NOT NULL
    );`);
};

const createRow = async data =>
  (await database.query(SQL`
  INSERT INTO
    links
    (
      to_user_id,
      endpoint,
      is_view_mode
    )
  VALUES
  (
    ${data.toUserId},
    ${data.endpoint},
    ${data.isViewMode}
  )
  RETURNING
    *;
`))[0];

// Get row by endpoint value
const getRow = async endpoint =>
  (await database.query(SQL`
  SELECT
    *
  FROM
    links
  WHERE
    endpoint = ${endpoint};
`))[0] || nul;

const getUserByEndpoint = async link =>
  (await database.query(SQL`
  select * from users inner join 
  (select to_user_id from links where endpoint = ${link}) t1
  on id=t1.to_user_id;
`))[0];

console.log("links table is created ...");

module.exports = {
  createTable,
  createRow,
  getRow,
  getUserByEndpoint
};
