const express = require("express");
const router = express.Router();
const { submitContact } = require("../controllers/contactController");

// Route to handle form submission
router.post("/", submitContact);

module.exports = router;
