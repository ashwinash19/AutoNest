// import React, { useEffect, useState } from "react";
// import API from "../api";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     API.get("/orders/mine")
//       .then((res) => setOrders(res.data))
//       .catch((err) => {
//         console.error("Failed to fetch orders", err);
//         alert("You must be logged in to view orders.");
//       });
//   }, []);

//   return (
//     <div>
//       <h2>My Orders</h2>
//       {orders.length === 0 ? (
//         <p>No past orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
//             <h4>Order ID: {order._id}</h4>
//             <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//             <p>Total: ${order.totalAmount.toFixed(2)}</p>
//             <ul>
//               {order.orderItems.map((item) => (
//                 <li key={item.product._id}>
//                   {item.product.name} - Quantity: {item.quantity}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Orders;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import "../Styling/Orders.css";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("/orders/mine")
//       .then((res) => setOrders(res.data))
//       .catch((err) => {
//         console.error("Failed to fetch orders", err);
//         if (err.response?.status === 401) {
//           alert("You must be logged in to view orders.");
//           navigate("/"); // redirect to home
//         }
//       });
//   }, [navigate]);

//   return (
//     <div className="orders-container">
//       <h2 className="orders-title">My Orders</h2>
//       {orders.length === 0 ? (
//         <p className="no-orders-msg">No past orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id} className="order-card">
//             <h4>Order ID: {order._id}</h4>
//             <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//             <p>Total: ₹{order.totalAmount.toFixed(2)}</p>
//             <ul>
//               {order.orderItems.map((item) => (
//                 <li key={item.product._id}>
//                   {item.product.name} - Quantity: {item.quantity}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Orders;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../Styling/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/orders/mine")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        if (err.response?.status === 401) {
          alert("You must be logged in to view orders.");
          navigate("/"); // redirect to home
        }
      });
  }, [navigate]);

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-msg">No past orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h4>Order ID: {order._id}</h4>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ₹{order.totalAmount.toFixed(2)}</p>

            <h5>Shipping Address:</h5>
            <p>Address: {order.shippingAddress?.address || "N/A"}</p>
            <p>Phone: {order.shippingAddress?.phone || "N/A"}</p>

            <h5>Order Items:</h5>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item.product._id}>
                  {item.product.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>

            <p>
              Status:{" "}
              {order.isPaid ? (
                <span style={{ color: "green", fontWeight: "bold" }}>Paid</span>
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>Pending Payment</span>
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;


