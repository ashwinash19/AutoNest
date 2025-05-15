// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { FaCar, FaTools, FaShoppingCart, FaClipboardList, FaUser, FaPhone } from "react-icons/fa"; 

// const Header = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (token) {
//       const decoded = jwtDecode(token);
//       setUsername(decoded.name || "User");
//     }

//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("cart");
//     navigate("/login");
//   };

//   return (
//     <nav style={styles.nav}>
//       <div style={styles.logoContainer}>
//         <FaCar style={styles.logoIcon} />
//         <FaTools style={styles.logoIcon} />
//         <h2 style={styles.logoText}>AutoNest</h2>
//       </div>
//       <div style={styles.links}>
//         <Link to="/" style={styles.link}>Home</Link>
//         <Link to="/products" style={styles.link}>Products</Link>

//         <Link to="/cart" style={styles.iconLink}>
//           <FaShoppingCart style={styles.icon} title="Cart" />
//         </Link>

//         <Link to="/orders" style={styles.iconLink}>
//           <FaClipboardList style={styles.icon} title="Orders" />
//         </Link>

//         <Link to="/contacts" style={styles.iconLink}>
//           <FaPhone style={styles.icon} title="Contacts" />
//         </Link>

//         {token ? (
//           <div style={styles.userBox} ref={dropdownRef}>
//             <FaUser 
//               style={styles.userIcon} 
//               onClick={() => setDropdownOpen(!dropdownOpen)} 
//               title="User Profile"
//             />
//             {dropdownOpen && (
//               <div style={styles.dropdown}>
//                 <div style={styles.dropdownItem}><strong>{username}</strong></div>
//                 <Link to="/profile" style={styles.dropdownItem}>Profile</Link>
//                 <div style={styles.dropdownItem} onClick={handleLogout}>Logout</div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div style={styles.authButton}>
//             <Link to="/login" style={styles.authLink}>Login</Link>
//             <span style={{ color: "#fff", margin: "0 5px" }}>/</span>
//             <Link to="/register" style={styles.authLink}>Register</Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     backgroundColor: "#222",
//     color: "#fff",
//     position: "relative",
//   },
//   logoContainer: {
//     display: "flex",
//     alignItems: "center",
//   },
//   logoIcon: {
//     color: "#00aced",
//     fontSize: "24px",
//     marginRight: "6px",
//   },
//   logoText: {
//     margin: 0,
//     fontSize: "24px",
//     color: "#fff",
//   },
//   links: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//   },
//   link: {
//     color: "#fff",
//     textDecoration: "none",
//   },
//   iconLink: {
//     color: "#fff",
//     fontSize: "22px",
//     textDecoration: "none",
//   },
//   icon: {
//     marginRight: "8px",
//   },
//   authButton: {
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "#007bff",
//     borderRadius: "20px",
//     padding: "6px 14px",
//   },
//   authLink: {
//     color: "#fff",
//     textDecoration: "none",
//     padding: "0 5px",
//   },
//   userBox: {
//     position: "relative",
//     backgroundColor: "#007bff",
//     borderRadius: "20px",
//     padding: "6px 12px",
//     cursor: "pointer",
//   },
//   userIcon: {
//     fontSize: "18px",
//     color: "#fff",
//   },
//   dropdown: {
//     position: "absolute",
//     top: "100%",
//     right: 0,
//     backgroundColor: "#fff",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     marginTop: "5px",
//     zIndex: 1000,
//     minWidth: "150px",
//     animation: "fadeIn 0.3s ease-in-out",
//   },
//   dropdownItem: {
//     padding: "10px",
//     color: "#222",
//     borderBottom: "1px solid #eee",
//     textDecoration: "none",
//     cursor: "pointer",
//   },
// };

// export default Header;



import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar, FaTools, FaShoppingCart, FaClipboardList, FaUser, FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';
import '../Styling/Header.css'; // Assuming you'll convert styles to CSS

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <nav className="header-nav">
      <div className="logo-container">
        <FaCar className="logo-icon" />
        <FaTools className="logo-icon" />
        <h2 className="logo-text">AutoNest</h2>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>

        <Link to="/cart" className="icon-link">
          <FaShoppingCart className="nav-icon" title="Cart" />
        </Link>

        <Link to="/orders" className="icon-link">
          <FaClipboardList className="nav-icon" title="Orders" />
        </Link>

        <Link to="/contacts" className="icon-link">
          <FaPhone className="nav-icon" title="Contacts" />
        </Link>

        {user ? (
          <div className="user-box" ref={dropdownRef}>
            <FaUser 
              className="user-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              title="User Profile"
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item"><strong>{user.name}</strong></div>
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-button">
            <Link to="/login" className="auth-link">Login</Link>
            <span className="auth-separator">/</span>
            <Link to="/register" className="auth-link">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;