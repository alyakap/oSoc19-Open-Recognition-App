"use strict";

// Import the Express server module
const express = require("express");
const externalusersTable = require("../../database/tables/external-user-table");

// Create our router for our external users API
const externalUsersRouter = express.Router();

// Create an external user
externalUsersRouter.post("/", async (req, res, next) => {
  const data = req.body;
  try {
    const externalUser = await externalusersTable.createRow(data);
    return res.send(externalUser);
  } catch (err) {
    return next(err);
  }
});

// Get all external users
externalUsersRouter.get("/", async (req, res, next) => {
  try {
    const externalUsers = await externalusersTable.getRows();
    return res.json(externalUsers);
  } catch (err) {
    return next(err);
  }
});

// Get a specific external user by Id
externalUsersRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const externalUser = await externalusersTable.getRow(id);
    return res.json(externalUser);
  } catch (err) {
    return next(err);
  }
});

// Delete a specific external user by id
externalUsersRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const externalUser = await externalusersTable.deleteRow(id);
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = externalUsersRouter;
