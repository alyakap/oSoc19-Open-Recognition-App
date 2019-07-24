const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('../config');

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => { console.log('Database connection established'); })
  .catch((err) => {
    console.error(`Database error, exiting. Stack trace:\n${err}`);
    process.exit();
  });

const testing_app = express();

testing_app.use(cors());
testing_app.use(bodyParser.urlencoded({ extended: true }));
testing_app.use(bodyParser.json());

testing_app.get('/', (req, res) => {
  res.json({ welcome: 'you are testing the authors api' });
});

const authors = require("./routes");
testing_app.use("/", authors);

const port = process.env.PORT || 4000;
testing_app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
