import React, { useState } from "react";
import "../Styling/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to submit. Please try again later."+err);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Your full name"
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="you@example.com"
          />

          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows="5" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            placeholder="Write your message here..."
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      ) : (
        <div className="thank-you-msg">
          <h3>Thank you for contacting us!</h3>
          <p>We have received your message and will get back to you shortly.</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
