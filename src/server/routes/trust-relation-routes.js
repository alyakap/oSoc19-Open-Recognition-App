"use strict";

// Import the Express server module
const express = require("express");
const trustRelationTable = require("../../database/tables/trust-relation-table");

// Create our router for our turst-relations API
const trustRelationRouter = express.Router();

// Get all turst relations
trustRelationRouter.get("/", async (req, res, next) => {
  try {
    const trustRelations = await trustRelationTable.getRows();
    return res.json(trustRelations);
  } catch (err) {
    return next(err);
  }
});

// Create a trust relation
trustRelationRouter.post("/", async (req, res, next) => {
  const data = req.body;
  try {
    const trustRelation = await trustRelationTable.createRow(data);
    return res.json(trustRelation);
  } catch (err) {
    return next(err);
  }
});

// Get one specific trust relation by id
trustRelationRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const trustRelation = await trustRelationTable.getRow(id);
    return res.json(trustRelation);
  } catch (err) {
    return next(err);
  }
});

// Modify one specific trust relation by id
trustRelationRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const trustRelation = await trustRelationTable.updateRow(id, data);
    return res.json(trustRelation);
  } catch (err) {
    return next(err);
  }
});

// Delete one specific  trust relation by id
trustRelationRouter.delete("/:fromUserId/:toUserId", async (req, res, next) => {
  const fromUserId = req.params.fromUserId;
  const toUserId = req.params.toUserId;
  try {
    await trustRelationTable.deleteRow(fromUserId, toUserId);
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

// Check if a trust relation is exited
trustRelationRouter.get(
  "/exist/:fromUserId/:toUserId",
  async (req, res, next) => {
    const fromUserId = req.params.fromUserId;
    const toUserId = req.params.toUserId;
    try {
      const isExist = await trustRelationTable.checkRowExitence(
        fromUserId,
        toUserId
      );
      return res.json(isExist[0].exists);
    } catch (err) {
      return next(err);
    }
  }
);

// Export our trust relation router
module.exports = trustRelationRouter;
