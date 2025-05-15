// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// const Admin = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("/products")
//       .then((res) => setProducts(res.data))
//       .catch(() => alert("Failed to fetch products"));
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/products/${id}`); // This route must be created in backend
//       setProducts(products.filter((p) => p._id !== id));
//     } catch (err) {
//       alert("Delete failed: " + err.response?.data?.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <button onClick={() => navigate("/admin/add")}>Add New Product</button>
//       <ul>
//         {products.map((p) => (
//           <li key={p._id}>
//             {p.name} - ${p.price}
//             <button onClick={() => navigate(`/admin/edit/${p._id}`)}>Edit</button>
//             <button onClick={() => handleDelete(p._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Admin;





import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../Styling/Admin.css"; // New CSS file for admin

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        alert("Failed to fetch products:",err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Delete failed: " + err.response?.data?.message);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <button 
          className="admin-add-btn"
          onClick={() => navigate("/admin/add")}
        >
          Add New Product
        </button>
      </div>

      <div className="products-list">
        {products.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="product-item">
              <div className="product-info">
                <span className="product-name">{p.name}</span>
                <span className="product-price">${p.price.toFixed(2)}</span>
              </div>
              <div className="product-actions">
                <button 
                  className="edit-btn"
                  onClick={() => navigate(`/admin/edit/${p._id}`)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;