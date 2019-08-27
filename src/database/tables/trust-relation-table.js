"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;

const createTable = () =>
  database.query(`
  CREATE TABLE IF NOT EXISTS
    trust_relation
    (
      id SERIAL PRIMARY KEY,
      from_user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      to_user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
    );
`);

const createRow = async data =>
  database.query(SQL`
  INSERT INTO
    trust_relation
    (
      from_user_id,
      to_user_id
    )
  VALUES
    (
      ${data.fromUserId},
      ${data.toUserId}
    )
`);

const getRows = async () =>
  await database.query(`
    SELECT
      *
    FROM
      trust_relation;
  `);

const getRow = async id =>
  await database.query(SQL`
    SELECT
      *
    FROM
      trust_relation
    WHERE
    id = ${id};
  `);

const updateRow = async (id, data) =>
  (await database.query(SQL`
  UPDATE
    trust_relation
  SET
    from_user_id = ${data.fromUserId},
    to_user_id = ${data.toUserId}
  WHERE
    id = ${id}
  RETURNING
    *;
`))[0];

const deleteRow = async (fromUserId, toUserId) =>
  database.query(SQL`
  DELETE FROM
    trust_relation
  WHERE
  from_user_id = ${fromUserId} AND to_user_id = ${toUserId}
`);

const checkRowExitence = async (fromUserId, toUserId) =>
  database.query(SQL`
  SELECT EXISTS( SELECT * FROM trust_relation WHERE 
      from_user_id = ${fromUserId} AND to_user_id = ${toUserId} );
`);

const getTrustedUsers = async toUserId =>
  database.query(SQL`
  SELECT * FROM users WHERE id IN
  (SELECT from_user_id as temp2 FROM trust_relation WHERE to_user_id=${toUserId});
`);

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow,
  deleteRow,
  checkRowExitence,
  getTrustedUsers
};
