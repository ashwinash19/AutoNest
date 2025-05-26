// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   orderItems: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "Product",
//       },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   totalAmount: { type: Number, required: true },
//   isPaid: { type: Boolean, default: false },
//   paidAt: { type: Date },
// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);



const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
