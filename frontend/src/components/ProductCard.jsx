




import React from 'react';
import { FaStar, FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartSlice';
import "../Styling/ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addProduct({
      _id: product.id,
      title: product.name,
      desc: product.description,
      img: product.image,
      price: product.price,
      quantity: 1,
    }));
  };

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/placeholder-product.png'; // Add fallback image
        }}
      />
      <div className="product-details">
        <div className="product-header">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <FaStar className="star-icon" />
          <span>{product.rating || '4.5'}</span>
        </div>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <FaCartPlus className="cart-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;