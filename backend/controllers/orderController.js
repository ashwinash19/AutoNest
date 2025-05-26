// const Order = require("../models/Order");
// const Product = require("../models/productModel");

// // Create a new order
// exports.createOrder = async (req, res) => {
//   const { orderItems, totalAmount } = req.body;

//   if (!orderItems || orderItems.length === 0) {
//     return res.status(400).json({ message: "No order items" });
//   }

//   try {
//     // Validate stock for each item
//     for (const item of orderItems) {
//       const product = await Product.findById(item.product);

//       if (!product) {
//         return res.status(404).json({ message: `Product with ID ${item.product} not found.` });
//       }

//       if (product.countInStock < item.quantity) {
//         return res.status(400).json({
//           message: `Not enough stock for ${product.name}. Available: ${product.countInStock}, Requested: ${item.quantity}`
//         });
//       }
//     }

//     // If all items pass stock validation, proceed to create the order
//     const order = await Order.create({
//       user: req.user._id,
//       orderItems,
//       totalAmount,
//     });

//     // Decrease stock for each ordered product
//     for (const item of orderItems) {
//       await Product.findByIdAndUpdate(item.product, {
//         $inc: { countInStock: -item.quantity }
//       });
//     }

//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ message: "Order creation failed", error: err.message });
//   }
// };

// // Get logged-in user's orders
// exports.getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id })
//       .populate("orderItems.product", "name price");

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get orders", error: err.message });
//   }
// };



const Order = require("../models/Order");
const Product = require("../models/productModel");

// Create a new order
exports.createOrder = async (req, res) => {
  const { orderItems, totalAmount, shippingAddress } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  if (!shippingAddress || !shippingAddress.address || !shippingAddress.phone) {
    return res.status(400).json({ message: "Shipping address and phone number are required" });
  }

  try {
    // Validate stock for each item
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found.` });
      }

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available: ${product.countInStock}, Requested: ${item.quantity}`
        });
      }
    }

    // Create the order (isPaid is false by default)
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalAmount,
      shippingAddress,
    });

    // Decrease stock for each ordered product
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.quantity }
      });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
};

// Mark order as paid (you can call this after payment is successful)
exports.markOrderPaid = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this order" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    await order.save();

    res.json({ message: "Order marked as paid", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order payment status", error: err.message });
  }
};

// Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.product", "name price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders", error: err.message });
  }
};
