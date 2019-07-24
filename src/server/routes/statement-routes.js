"use strict";

// Import the Express server module
const express = require("express");
const statementsTable = require("../../database/tables/statements-table");

// Create our router for our statements API
const statementRouter = express.Router();

// Create a statement
statementRouter.post("/", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  try {
    const statement = await statementsTable.createRow(data);
    return res.json(statement);
  } catch (err) {
    return next(err);
  }
});

// Get all statements
statementRouter.get("/", async (req, res, next) => {
  try {
    const statements = await statementsTable.getRows();
    return res.json(statements);
  } catch (err) {
    return next(err);
  }
});

// Get a specific statement by Id

statementRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const statement = await statementsTable.getRow(id);
    return res.json(statement);
  } catch (err) {
    return next(err);
  }
});

// Modify one specific statement by id

statementRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const statement = await statementsTable.updateRow(id, data);
    return res.json(statement);
  } catch (err) {
    return next(err);
  }
});

// Delete a specific statement by id

statementRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const statement = await statementsTable.deleteRow(id);
    return res.json();
  } catch (err) {
    return next(err);
  }
});

module.exports = statementRouter;
