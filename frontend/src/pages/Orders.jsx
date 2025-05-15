import React, { useEffect, useState } from "react";
import API from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/mine")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        alert("You must be logged in to view orders.");
      });
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <h4>Order ID: {order._id}</h4>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${order.totalAmount.toFixed(2)}</p>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item.product._id}>
                  {item.product.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
