import React, { useState } from "react";
import "../Styling/CheckoutModal.css";

const CheckoutModal = ({ cartItems = [], totalPrice = 0, onClose, onConfirm }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (!address.trim() || !phone.trim()) {
      alert("Please enter both address and phone number.");
      return;
    }
    onConfirm({ address, phone });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.title} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: ₹{totalPrice}</p>
        <input
          type="text"
          placeholder="Enter Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleSubmit}>Pay</button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
