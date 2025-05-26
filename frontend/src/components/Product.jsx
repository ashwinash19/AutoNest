

// import React, { useState, useEffect } from "react";
// import { FaStar, FaCartPlus } from "react-icons/fa";
// import { useDispatch } from 'react-redux';
// import { addProduct } from '../redux/cartSlice';
// import API from "../api";
// import "../Styling/Products.css";
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
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product) => {
//     dispatch(addProduct({
//       _id: product._id,
//       title: product.name,
//       price: product.price,
//       img: product.imageUrl ? `http://localhost:5000${product.imageUrl}` : placeholderImg,
//       description: product.description,
//       quantity: 1
//     }));
//     alert(`${product.name} added to cart!`);
//   };

//   return (
//     <div className="product-container">
//       <h1 className="product-title">Top Selling Auto Parts</h1>
//       <div className="product-grid">
//         {products.map((product) => (
//           <div key={product._id} className="product-card">
//             <img
//               src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : placeholderImg}
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
//                 <span className="product-price">₹{product.price.toFixed(2)}</span>
//               </div>
//               <p className="product-brand">{product.brand}</p>
//               <div className="product-rating">
//                 <FaStar className="star" />
//                 <span>{product.rating || 4.5}</span>
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
import { useLocation } from "react-router-dom";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import API from "../api";
import "../Styling/Products.css";
import placeholderImg from "../assets/images/suspension.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState("All");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryParam = new URLSearchParams(location.search).get("category");

  const user = useSelector((state) => state.auth.user); // 👈 Check auth state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        const categoryProducts = categoryParam
          ? response.data.filter((p) => p.category === categoryParam)
          : response.data;

        setProducts(categoryProducts);
        setFiltered(categoryProducts);
        const uniqueBrands = ["All", ...new Set(categoryProducts.map((p) => p.brand))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryParam]);

  useEffect(() => {
    let temp = [...products];

    if (selectedBrand !== "All") {
      temp = temp.filter((p) => p.brand === selectedBrand);
    }

    temp = temp.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFiltered(temp);
  }, [selectedBrand, priceRange, products]);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please log in to add products to cart.");
      navigate("/login");
      return;
    }

    dispatch(
      addProduct({
        _id: product._id,
        title: product.name,
        price: product.price,
        img: product.imageUrl ? `http://localhost:5000${product.imageUrl}` : placeholderImg,
        description: product.description,
        quantity: 1,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-container">
      <h1 className="product-title">{categoryParam} Products</h1>

      <div className="filters">
        <select onChange={(e) => setSelectedBrand(e.target.value)}>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <input
          type="range"
          min="0"
          max="100000"
          value={priceRange[1]}
          step="1000"
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <span>Up to ₹{priceRange[1]}</span>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
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
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
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

