// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";
// import "../Styling/Login.css"

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/users/login", form);
//       localStorage.setItem("token", res.data.token);
//       alert("Login successful!");
//       navigate("/");
//     } catch (err) {
//       alert("Login failed: " + err.response?.data?.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input name="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../redux/authSlice';
// import "../Styling/Login.css";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError(""); // Clear error when user types
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const res = await API.post("/users/login", form);
      
//       dispatch(setCredentials({ 
//         token: res.data.token,
//         user: {
//           _id: res.data._id,
//           name: res.data.name,
//           email: res.data.email,
//           role: res.data.role
//         }
//       }));
      
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//       console.error("Login error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2 className="login-title">Login</h2>
        
//         {error && <div className="error-message">{error}</div>}
        
//         <div className="form-group">
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//         </div>
        
//         <div className="form-group">
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//         </div>
        
//         <button 
//           type="submit" 
//           className="submit-btn"
//           disabled={isLoading}
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../redux/authSlice';
// import "../Styling/Login.css";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError(""); // Clear error on typing
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const res = await API.post("/users/login", form);
//       dispatch(setCredentials({
//         token: res.data.token,
//         user: {
//           _id: res.data._id,
//           name: res.data.name,
//           email: res.data.email,
//           role: res.data.role
//         }
//       }));

//       // Redirect based on user role
//       if (res.data.role === 'admin') {
//         navigate("/admin"); // Navigate to admin dashboard
//       } else {
//         navigate("/"); // Navigate to home page
//       }
      
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2 className="login-title">Login</h2>

//         {error && <div className="error-message">{error}</div>}

//         <div className="form-group">
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//         </div>

//         <div className="form-group">
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//         </div>

//         <button
//           type="submit"
//           className="submit-btn"
//           disabled={isLoading}
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import "../Styling/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await API.post("/users/login", form);
      dispatch(setCredentials({
        token: res.data.token,
        user: {
          _id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role
        }
      }));

      // Redirect based on user role
      if (res.data.user.role === 'admin') {
        navigate("/admin"); // Navigate to admin dashboard
      } else {
        navigate("/"); // Navigate to home page
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;