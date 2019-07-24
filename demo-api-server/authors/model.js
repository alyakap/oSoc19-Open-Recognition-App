const mongoose = require('mongoose');

const author_schema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    }
  }
);

module.exports = mongoose.model('author', author_schema);
