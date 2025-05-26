// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/users/register", form);
//       localStorage.setItem("token", res.data.token);
//       alert("Registration successful!");
//       navigate("/");
//     } catch (err) {
//       alert("Registration failed: " + err.response?.data?.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <input name="name" placeholder="Name" onChange={handleChange} required />
//       <input name="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;




// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";
// import "../Styling/Register.css";

// const Register = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     inviteToken: ""
//   });
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleToggle = () => {
//     setIsAdmin(!isAdmin);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         ...(isAdmin && { inviteToken: form.inviteToken })
//       };

//       const res = await API.post("/users/register", payload);
//       localStorage.setItem("token", res.data.token);
//       alert("Registration successful!");
//       navigate("/");
//     } catch (err) {
//       alert("Registration failed: " + (err.response?.data?.message || "Unknown error"));
//     }
//   };

//   return (
//     <div className="register-container">
//       <form onSubmit={handleSubmit} className="register-form">
//         <div className="role-toggle">
//           <span>User</span>
//           <label className="toggle-switch">
//             <input
//               type="checkbox"
//               checked={isAdmin}
//               onChange={handleToggle}
//             />
//             <span className="slider"></span>
//           </label>
//           <span>Admin</span>
//         </div>

//         <h2 className="register-title">Register</h2>

//         <div className="form-group">
//           <input
//             name="name"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//         </div>

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

//         {isAdmin && (
//           <div className="form-group">
//             <input
//               name="inviteToken"
//               placeholder="Admin Invite Token"
//               value={form.inviteToken}
//               onChange={handleChange}
//               required
//               className="form-input"
//             />
//           </div>
//         )}

//         <button type="submit" className="submit-btn">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../Styling/Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    inviteToken: ""
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        ...(isAdmin && { inviteToken: form.inviteToken })
      };

      const res = await API.post("/users/register", payload);
      localStorage.setItem("token", res.data.token);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="role-toggle">
          <span>User</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={handleToggle}
            />
            <span className="slider"></span>
          </label>
          <span>Admin</span>
        </div>

        <h2 className="register-title">Register</h2>

        <div className="form-group">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

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

        {isAdmin && (
          <div className="form-group">
            <input
              name="inviteToken"
              placeholder="Admin Invite Token"
              value={form.inviteToken}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
