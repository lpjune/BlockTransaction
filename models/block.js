var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BlockSchema = new Schema({
  index: { type: String, required: true },
  hash: { type: String, required: true },
  prevHash: { type: String, required: false },
  cost: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  date: { type: String, required: true },
  hidden: { type: Boolean, required: true}
});

// Virtual for this block instance URL.
BlockSchema.virtual("url").get(function() {
  return "/catalog/block/" + this._id;
});

BlockSchema.virtual("name").get(function() {
  return this.lastName + ", " + this.firstName;
});

// Export model.
module.exports = mongoose.model("Block", BlockSchema);
