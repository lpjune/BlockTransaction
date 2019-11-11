var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BlockSchema = new Schema({
  hash: { type: String, required: true },
  prevHash: { type: String, required: true },
  cost: { type: String, required: true },
  firstName: { type: String, required: true }
});

// Virtual for this block instance URL.
BlockSchema.virtual("url").get(function() {
  return "/catalog/block/" + this._id;
});

// Export model.
module.exports = mongoose.model("Block", BlockSchema);
