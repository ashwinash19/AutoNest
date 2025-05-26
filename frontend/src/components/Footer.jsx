import React from "react";
import "../Styling/Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>AutoNest</h2>
          <p>Quality auto parts at your fingertips</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@autonest.com</p>
          <p>Phone: +1-234-567-8901</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AutoNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
