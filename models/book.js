var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true }
});

// Virtual for this book instance URL.
BookSchema.virtual("url").get(function() {
  return "/catalog/book/" + this._id;
});

// Export model.
module.exports = mongoose.model("Book", BookSchema);
