var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BlockSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true }
});

// Virtual for this block instance URL.
BlockSchema.virtual("url").get(function() {
  return "/catalog/block/" + this._id;
});

// Export model.
module.exports = mongoose.model("Block", BlockSchema);
