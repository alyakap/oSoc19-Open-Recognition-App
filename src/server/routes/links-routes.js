"use strict";

// Import the Express server module
const express = require("express");
const linkTable = require("../../database/tables/links-table");

// Create our router for our links API
const linkRouter = express.Router();

// Get specific link by endpoint value
linkRouter.get("/:endpoint", async (req, res, next) => {
  const endpoint = req.params.endpoint;
  try {
    const link = await linkTable.getRow(endpoint);
    return res.json(link);
  } catch (err) {
    return next(err);
  }
});

// Create a link
linkRouter.post("/", async (req, res, next) => {
  const data = req.body;
  try {
    const link = await linkTable.createRow(data);
    console.log("create link ", link);
    return res.send(link);
  } catch (err) {
    return next(err);
  }
});

// Get user Info by endpoint value
linkRouter.get("/link/:endpoint", async (req, res, next) => {
  const endpoint = req.params.endpoint;
  try {
    const user = await linkTable.getUserByEndpoint(endpoint);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
});

module.exports = linkRouter;
