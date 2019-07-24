const mongoose = require('mongoose');

const book_schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  }
);

module.exports = mongoose.model('books', book_schema);
