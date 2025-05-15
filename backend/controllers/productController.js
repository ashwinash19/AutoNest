// const Product = require("../models/Product");

// // Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch products", error: err.message });
//   }
// };

// // Create a product (admin only)
// exports.createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ message: "Product creation failed", error: err.message });
//   }
// };

// // Get product by ID
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get product", error: err.message });
//   }
// };

// // Update product
// exports.updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Update failed", error: err.message });
//   }
// };

// // Delete product
// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed", error: err.message });
//   }
// };



const Product = require("../models/productModel");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Create a product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // If image uploaded via multer, get filename
    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Product creation failed", error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to get product", error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedData = req.body;

    // Handle image upload update
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
