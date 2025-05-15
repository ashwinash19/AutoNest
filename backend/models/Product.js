const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  countInStock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
