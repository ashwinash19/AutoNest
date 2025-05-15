// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Generate JWT Token
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, name: user.name },
//     process.env.JWT_SECRET,
//     { expiresIn: "30d" }
//   );
// };


// // Register User
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, inviteToken } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Determine role based on invite token
//     const ADMIN_INVITE_TOKEN = process.env.ADMIN_INVITE_TOKEN; // Store in environment variables for security
//     const role = inviteToken === ADMIN_INVITE_TOKEN ? "admin" : "user";

//     // Create the user with role
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role, // Set the role based on the invite token
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user),

//     });
//   } catch (error) {
//     res.status(500).json({ message: "Registration failed", error: error.message });
//   }
// };

// // Login User
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role, // Include role in response
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error: error.message });
//   }
// };
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const registerUser = async (req, res) => {
//   const { name, email, password, inviteToken } = req.body;

//   try {
//     // Check if the user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Check if admin registration is requested and validate invite token
//     let role = "user";
//     if (req.body.inviteToken) {
//       if (req.body.inviteToken !== process.env.ADMIN_INVITE_TOKEN) {
//         return res.status(403).json({ message: "Invalid admin invite token" });
//       }
//       role = "admin";
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     // Save user to database
//     const savedUser = await user.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: savedUser._id, role: savedUser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Check if password is correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { registerUser, loginUser };


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { name, email, password, inviteToken } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if admin registration is requested and validate invite token
    let role = "user";
    if (inviteToken) {
      if (inviteToken !== process.env.ADMIN_INVITE_TOKEN) {
        return res.status(403).json({ message: "Invalid admin invite token" });
      }
      role = "admin";
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    const savedUser = await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };