"use strict";

// Import the Express server module
const express = require("express");
const userTable = require("../../database/tables/users-table");
const statementTable = require("../../database/tables/statements-table");
const trustRelationTable = require("../../database/tables/trust-relation-table");

// Create our router for our users API
const userRouter = express.Router();

// Get all users
// userRouter.get("/", async (req, res, next) => {
//   try {
//     const users = await userTable.getRows();
//     return res.json(users);
//   } catch (err) {
//     return next(err);
//   }
// });

// Create a user
userRouter.post("/", async (req, res, next) => {
  const data = req.body;
  try {
    const user = await userTable.createRow(data);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
});

// Get one specific user by id
userRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userTable.getRow(Number(id));
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

// Modify one specific user by id
userRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const user = await userTable.updateRow(id, data);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

// Delete one specific user by id
userRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await userTable.deleteRow(id);
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

// Get all the statements are wirtten to a specific user
userRouter.get("/:id/statements", async (req, res, next) => {
  const id = req.params.id;
  try {
    const userStatements = await statementTable.getUserStatements(id);
    return res.json(userStatements);
  } catch (err) {
    return next(err);
  }
});

// Get all trust relations of specific user
userRouter.get("/:id/trustedUsers", async (req, res, next) => {
  const id = req.params.id;
  try {
    const trustedUsers = await trustRelationTable.getTrustedUsers(id);
    return res.json(trustedUsers);
  } catch (err) {
    return next(err);
  }
});

// Check existance user's account
userRouter.get("/", async (req, res, next) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const user = await userTable.checkRowExitence(username, password);
    if (user !== null) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send("Not found..");
    }
  } catch (err) {
    return next(err);
  }
});

// Export our user router
module.exports = userRouter;
