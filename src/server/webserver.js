"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create our server/
const app = express();

const PORT = 1337;

app.use(bodyParser.json());
app.use(cors());

// Setup our users routes
app.use("/api/users", require("./routes/user-routes"));

// Setup our statements routes
app.use("/api/statements", require("./routes/statement-routes"));

// Setup our trust relations routes
app.use("/api/trust-relations", require("./routes/trust-relation-routes"));

// Setup our external users routes
app.use("/api/external-users", require("./routes/external-user-routes"));

// Setup our links routes
app.use("/api/links", require("./routes/links-routes"));

app.use((err, req, res, next) => {
  console.error("Oops, we got an error:", err);
  if (!res.headersSent) {
    res.status(500).json({});
  }
});

// Make the server listen on a port
app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Webserver listening on http://localhost:${PORT}/`);
});
