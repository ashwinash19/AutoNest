




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
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div>

      {/* ---------------- HERO SECTION WITH CLOUDINARY VIDEO ---------------- */}
      <div className="hero-section">

        <div className="hero-video-container">
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=duuludq4d&public_id=bmw_fdoxoy&profile=cld-default"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>

        <div className="hero-content">
          <h1>Welcome to AutoNest</h1>
          <p>Premium accessories for your car—Drive in style.</p>
        </div>

      </div>


      {/* ---------------- CATEGORY SECTION ---------------- */}
      <div className="category-section">
        <h2>Select Your Category</h2>

        <div className="category-buttons">
          {categories.map((cat, index) => (
            <button
              key={index}
              className="category-button"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
