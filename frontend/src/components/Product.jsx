


// import React, { useState, useEffect } from "react";
// import { FaStar, FaCartPlus } from "react-icons/fa";
// import { useDispatch } from 'react-redux';
// import { addProduct } from '../redux/cartSlice';
// import API from "../api";
// import "../Styling/Products.css";

// import brakeImg from "../assets/images/brake.jpg";
// import exhaustImg from "../assets/images/exhaust.jpg";
// import brakeoilImg from "../assets/images/brakeoil.jpg";
// import filterImg from "../assets/images/filter.jpg";
// import placeholderImg from "../assets/images/suspension.jpg";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API.get('/products');
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         // Fallback to static products if API fails
//         setProducts([
//           {
//             id: 1,
//             img: brakeImg,
//             name: "Performance Brake Kit",
//             brand: "StopTech",
//             price: 399.99,
//             rating: 4.8,
//             reviews: 124,
//             description: "High-performance brake kit for sports cars and racing.",
//           },
//           {
//             id: 2,
//             img: exhaustImg,
//             name: "Synthetic Engine Oil (5L)",
//             brand: "Castrol",
//             price: 49.99,
//             rating: 4.6,
//             reviews: 208,
//             description: "Full synthetic engine oil suitable for high-performance engines.",
//           },
//           {
//             id: 3,
//             img: brakeoilImg,
//             name: "LED Headlight Set",
//             brand: "Philips",
//             price: 129.99,
//             rating: 4.9,
//             reviews: 87,
//             description: "Ultra-bright LED headlight conversion kit. Energy efficient.",
//           },
//           {
//             id: 4,
//             img: filterImg,
//             name: "Performance Air Filter",
//             brand: "K&N",
//             price: 59.99,
//             rating: 4.5,
//             reviews: 94,
//             description: "High-flow air filter for improved engine breathing.",
//           }
//         ]);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product) => {
//     dispatch(addProduct({
//       _id: product._id, // Use _id for unique key
//       title: product.name,
//       price: product.price,
//       img: product.img || placeholderImg, // Fallback if no image is provided
//       description: product.description,
//       quantity: 1
//     }));
//     alert(`${product.name} added to cart!`); // Corrected template literal
//   };

//   return (
//     <div className="product-container">
//       <h1 className="product-title">Top Selling Auto Parts</h1>
//       <div className="product-grid">
//         {products.map((product) => (
//           <div key={product._id} className="product-card"> {/* Changed to _id */}
//             <img
//               src={product.img || placeholderImg} // Use fallback image if no img URL
//               alt={product.name}
//               className="product-img"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = placeholderImg;
//               }}
//             />
//             <div className="product-content">
//               <div className="product-header">
//                 <h3 className="product-name">{product.name}</h3>
//                 <span className="product-price">${product.price.toFixed(2)}</span>
//               </div>
//               <p className="product-brand">{product.brand}</p>
//               <div className="product-rating">
//                 <FaStar className="star" />
//                 <span>{product.rating}</span>
//                 <span className="reviews">({product.reviews})</span>
//               </div>
//               <p className="product-description">{product.description}</p>
//               <button
//                 className="add-to-cart-btn"
//                 onClick={() => handleAddToCart(product)}
//               >
//                 <FaCartPlus className="cart-icon" />
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

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
                <span className="product-price">${product.price.toFixed(2)}</span>
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
