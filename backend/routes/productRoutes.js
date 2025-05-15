// const express = require("express");
// const router = express.Router();
// const {
//   getProducts,
//   createProduct,
//   deleteProduct,
//   updateProduct,
//   getProductById,
// } = require("../controllers/productController");

// const { protect, admin } = require("../middleware/authMiddleware");

// router.get("/", getProducts);
// router.get("/:id", getProductById); // NEW: Get single product
// router.post("/", protect, admin, createProduct);
// router.put("/:id", protect, admin, updateProduct); // NEW: Update
// router.delete("/:id", protect, admin, deleteProduct); // NEW: Delete

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, upload.single('imageUrl'), createProduct);
router.put("/:id", protect, admin, upload.single('imageUrl'), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
