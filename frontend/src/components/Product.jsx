

import React, { useState, useEffect } from "react";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartSlice';
import API from "../api";
import "../Styling/Products.css";
import placeholderImg from "../assets/images/suspension.jpg";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addProduct({
      _id: product._id,
      title: product.name,
      price: product.price,
      img: product.imageUrl ? `http://localhost:5000${product.imageUrl}` : placeholderImg,
      description: product.description,
      quantity: 1
    }));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-container">
      <h1 className="product-title">Top Selling Auto Parts</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : placeholderImg}
              alt={product.name}
              className="product-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImg;
              }}
            />
            <div className="product-content">
              <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">₹{product.price.toFixed(2)}</span>
              </div>
              <p className="product-brand">{product.brand}</p>
              <div className="product-rating">
                <FaStar className="star" />
                <span>{product.rating || 4.5}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                <FaCartPlus className="cart-icon" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
