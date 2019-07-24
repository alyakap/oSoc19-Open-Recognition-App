// this file will be used to set up deployment
"use strict";

// Import our webserver library
const webserver = require("./server/webserver");
const userTable = require("./database/tables/users-table");
const statementsTable = require("./database/tables/statements-table");
const turstRelationTable = require("./database/tables/trust-relation-table");
const externalUserTable = require("./database/tables/external-user-table");
const linksTable = require("./database/tables/links-table");
// If the CTRL + C keys are pressed, exit
process.on("SIGINT", () => process.exit(128));
(async () => {
  // Create the user table
  await userTable.createTable();
  console.log("User table is created..");
  // Create the external user table
  await externalUserTable.createTable();
  console.log("External user table is created..");
  // Create the statements table
  await statementsTable.createTable();
  console.log("Statement table is created..");
  // Create the trust-relation table
  await turstRelationTable.createTable();
  console.log("Trust relation table is created..");
  // Create the links table
  await linksTable.createTable();
  console.log("Links table is created..");

})();
