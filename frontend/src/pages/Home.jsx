




// import React, { useEffect, useState } from "react";
// import API from "../api";
// import "../Styling/Home.css";
// import { useDispatch } from 'react-redux';
// import { addProduct } from '../redux/cartSlice';
// import placeholderImg from "../assets/images/suspension.jpg";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     API.get("/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products", err));
//   }, []);

//   const addToCart = (product) => {
//     dispatch(addProduct({
//       _id: product._id,
//       title: product.name,
//       price: product.price,
//       img: product.imageUrl ? `http://localhost:5000${product.imageUrl}` : placeholderImg,
//       description: product.description
//     }));

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existing = cart.find((item) => item._id === product._id);

//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       cart.push({
//         ...product,
//         quantity: 1,
//         title: product.name,
//         img: product.imageUrl ? `http://localhost:5000${product.imageUrl}` : placeholderImg
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Added to cart!");
//   };

//   return (
//     <div className="home-container">
//       <header className="hero-section">
//         <h1>Welcome to AutoNest</h1>
//         <p>Your one-stop shop for quality auto parts</p>
//       </header>

//       <section className="product-section">
//         <h2>Featured Products</h2>
//         <div className="product-grid">
//           {products.slice(0, 8).map((p) => (
//             <div key={p._id} className="product-card">
//               <img
//                 src={p.imageUrl ? `http://localhost:5000${p.imageUrl}` : placeholderImg}
//                 alt={p.name}
//                 className="product-image"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = placeholderImg;
//                 }}
//               />
//               <h3 className="product-name">{p.name}</h3>
//               <p className="product-description">{p.description}</p>
//               <p className="product-price">₹{p.price.toFixed(2)}</p>
//               <button
//                 className="add-to-cart-btn"
//                 onClick={() => addToCart(p)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import API from "../api";
import "../Styling/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        {/* Background video */}
        <div className="hero-video">
          <video autoPlay loop muted className="video-bg">
            <source src="/bmw.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay content */}
        <div className="hero-content">
          <h1>Welcome to AutoNest</h1>
          <p>Your one-stop shop for quality auto parts</p>
        </div>
      </header>

      <section className="category-section">
        <h2>Select a Category</h2>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="category-button"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
