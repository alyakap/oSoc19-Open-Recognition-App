"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;

const createTable = () => {
  database.query(`
  CREATE TABLE IF NOT EXISTS
    users
    (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      photo TEXT NOT NULL,
      login TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL,
      profession TEXT NOT NULL,
      address TEXT NOT NULL
    ); 
`);
  console.log("user table is created");
};

const createRow = async data =>
  (await database.query(SQL`
  INSERT INTO
    users 
    (
      first_name,
      last_name,
      photo,
      login,
      password,
      email,
      profession,
      address
    ) 
  VALUES
    (
      ${data.firstName},
      ${data.lastName},
      ${data.photo},
      ${data.login},
      ${data.password},
      ${data.email},
      ${data.profession},
      ${data.address}
    )
    RETURNING 
      *;`))[0];

const getRow = async id =>
  (await database.query(SQL`
  SELECT
    *
  FROM
    users
  WHERE
    id = ${id};
`))[0] || null;

const getRows = async () =>
  await database.query(`
  SELECT
    *
  FROM
    users;
`);

const deleteRow = id =>
  database.query(SQL`
  DELETE FROM
    users
  WHERE
    id = ${id};
`);

const checkRowExitence = async (username, password) =>
  (await database.query(SQL`
  SELECT
    *
  FROM
    users
  WHERE
  login = ${username} AND password = ${password};
`))[0] || null;

//not used
const updateRow = async (id, data) =>
  (await database.query(SQL`
  UPDATE
    users
  SET
    first_name = ${data.firstName},
    last_name = ${data.lastName},
    photo =${data.photo},
    login = ${data.login},
    password = ${data.password},
    email = ${data.email},
    profession =${data.profession},
    address = ${data.address}
  WHERE
    id = ${id}
  RETURNING
    *;
`))[0] || null;

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow,
  deleteRow,
  checkRowExitence
};
