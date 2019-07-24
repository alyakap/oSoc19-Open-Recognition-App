"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;

const createTable = () =>
  database.query(`
  CREATE TABLE IF NOT EXISTS
    external_user
    (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      profession TEXT NOT NULL,
      photo Text
    );
`);

const createRow = async data =>
  (await database.query(SQL`
    INSERT INTO
      external_user
      (
        first_name,
        last_name,
        email,
        profession,
        photo
      )
    VALUES
    (
      ${data.firstName},
      ${data.lastName},
      ${data.email},
      ${data.profession},
      ${data.photo}
    )
    RETURNING
      *;
  `))[0];

const getRows = async () =>
  await database.query(`
    SELECT
      *
    FROM
      external_user;
  `);

const getRow = async id =>
  (await database.query(SQL`
    SELECT
      *
    FROM
      external_user
    WHERE
    id = ${id};
  `))[0] || null;

const deleteRow = async id =>
  database.query(SQL`
  DELETE FROM
    external_user
  WHERE
  id = ${id};
`);

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  deleteRow
};
