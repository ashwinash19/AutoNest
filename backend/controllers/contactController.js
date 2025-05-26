const Contact = require("../models/Contact");

// Handle contact form submission
exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const contactEntry = new Contact({ name, email, message });
    const savedContact = await contactEntry.save();
    res.status(201).json({ message: "Contact form submitted successfully.", contact: savedContact });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit contact form.", error: error.message });
  }
};
