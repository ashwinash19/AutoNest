// // backend/server.js

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./Config/db");

// // Load environment variables
// dotenv.config();

// // Initialize Express
// const app = express();

// // Connect to MongoDB before anything else
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json()); // should come before routes

// // Routes
// const userRoutes = require("./routes/userRoutes");
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// app.get("/", (req, res) => res.send("API is running..."));

// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port : ${PORT}`);
// });



// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes"); // ✅ Added this

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));


// // ✅ Register Routes
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes); // ✅ Added this

// // Connect to MongoDB and start server
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });




const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder statically with cross-platform safe path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contacts", contactRoutes);

// Connect to MongoDB and start server only if successful
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });
