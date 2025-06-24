const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imageUrl: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },          // from dropdown
  extraInfo:{type:String , required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }  // owner
}, { timestamps: true });

module.exports = mongoose.model("Products", productSchema);
  