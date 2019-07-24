"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;

const createTable = () =>
  database.query(`
  CREATE TABLE IF NOT EXISTS
    statements
    (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      date TEXT NOT NULL,
      from_user_id INTEGER REFERENCES users (id),
      to_user_id INTEGER NOT NULL REFERENCES users (id),
      from_external_user_id INTEGER REFERENCES external_user (id)
      
    );
`);

const createRow = async data =>
  (await database.query(SQL`
    INSERT INTO
      statements
      (
        text,
        date,
        from_user_id,
        to_user_id,
        from_external_user_id
      )
    VALUES
    (
      ${data.text},
      ${data.date},
      ${data.fromUserId},
      ${data.toUserId},
      ${data.fromExternalUserId}
    )
  `))[0];

const getRows = async () =>
  await database.query(`
    SELECT
      *
    FROM
    statements;
  `);

const getRow = async id =>
  await database.query(SQL`
    SELECT
      *
    FROM
      statements
    WHERE
    id = ${id};
  `);

const updateRow = async (id, data) =>
  (await database.query(SQL`
  UPDATE
    statements
  SET
    text = ${data.text}
  WHERE
    id = ${id}
  RETURNING
    *;
`))[0];

const deleteRow = async id =>
  database.query(SQL`
  DELETE FROM
    statements
  WHERE
  id = ${id};
`);

const getUserStatements = async userId =>
  await database.query(SQL`
  SELECT 
    *
  FROM
    statements 
  WHERE
    to_user_id = ${userId};
`);

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow,
  deleteRow,
  getUserStatements
};
