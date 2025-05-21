

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, updateQuantity } from "../components/CartSlice";
import "../Styling/Cart.css";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../assets/images/suspension.jpg";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, newQuantity }));
    } else {
      dispatch(removeProduct(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cart.products.length > 0 ? (
        <div className="cart-items">
          <div className="cart-list">
            {cart.products.map((product) => (
              <div key={product._id} className="cart-item">
                <img 
                  src={product.img?.startsWith("http") ? product.img : `http://localhost:5000${product.img}`} 
                  alt={product.title} 
                  className="cart-item-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                  }}
                />
                <div className="cart-item-details">
                  <h3>{product.title}</h3>
                  <p>₹{product.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(product._id, product.quantity, -1)} className="quantity-btn">-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleQuantityChange(product._id, product.quantity, 1)} className="quantity-btn">+</button>
                    <button onClick={() => handleRemoveItem(product._id)} className="remove-btn">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal ({cart.quantity} items)</span>
              <span>₹{cart.total.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-line total">
              <span>Total</span>
              <span>₹{cart.total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="empty-cart-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="empty-cart-title">Your cart is empty</h3>
          <p className="empty-cart-subtitle">Looks like you haven't added anything to your cart yet</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
