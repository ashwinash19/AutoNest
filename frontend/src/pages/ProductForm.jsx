




import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "../Styling/ProductForm.css";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
    countInStock: ""
  });

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      API.get(`/products/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => alert("Failed to fetch product"))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "price" || name === "countInStock" ? Number(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      if (form.imageUrl instanceof File) {
        formData.set("imageUrl", form.imageUrl);
      }

      if (isEdit) {
        await API.put(`/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Product updated successfully!");
      } else {
        await API.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Product created successfully!");
      }

      navigate("/admin");
    } catch (err) {
      alert(`Operation failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2 className="form-title">{isEdit ? "Edit Product" : "Add New Product"}</h2>
        <div className="form-grid">
          {Object.entries(form).map(([field, value]) => (
            field === "imageUrl" ? (
              <div key={field} className="form-group">
                <label htmlFor={field} className="form-label">Image</label>
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/*"
                  onChange={(e) => setForm(prev => ({ ...prev, imageUrl: e.target.files[0] }))}
                  className="form-input"
                />
              </div>
            ) : (
              <div key={field} className="form-group">
                <label htmlFor={field} className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "price" || field === "countInStock" ? "number" : "text"}
                  value={value}
                  onChange={handleChange}
                  required={field !== "imageUrl"}
                  className="form-input"
                  min={field === "price" || field === "countInStock" ? "0" : undefined}
                />
              </div>
            )
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/admin")} className="cancel-btn">Cancel</button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : (isEdit ? "Update" : "Create")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
