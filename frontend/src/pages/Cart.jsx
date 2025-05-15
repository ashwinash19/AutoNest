// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeProduct, updateQuantity } from "../components/CartSlice";

// const Cart = () => {
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const handleQuantityChange = (id, currentQuantity, change) => {
//     const newQuantity = currentQuantity + change;
//     if (newQuantity > 0) {
//       dispatch(updateQuantity({ id, newQuantity }));
//     } else {
//       dispatch(removeProduct(id));
//     }
//   };

//   const handleRemoveItem = (id) => {
//     dispatch(removeProduct(id));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>
      
//       {cart.products.length > 0 ? (
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="md:w-2/3">
//             {cart.products.map((product) => (
//               <div key={product._id} className="flex flex-col sm:flex-row border-b py-4">
//                 <img 
//                   src={product.img} 
//                   alt={product.title} 
//                   className="w-32 h-32 object-cover rounded"
//                 />
//                 <div className="sm:ml-4 mt-4 sm:mt-0 flex-1">
//                   <h3 className="text-lg font-semibold">{product.title}</h3>
//                   <p className="text-gray-600">${product.price}</p>
                  
//                   <div className="mt-4 flex items-center">
//                     <button 
//                       onClick={() => handleQuantityChange(product._id, product.quantity, -1)}
//                       className="bg-gray-200 px-3 py-1 rounded-l"
//                     >
//                       -
//                     </button>
//                     <span className="bg-gray-100 px-4 py-1">{product.quantity}</span>
//                     <button 
//                       onClick={() => handleQuantityChange(product._id, product.quantity, 1)}
//                       className="bg-gray-200 px-3 py-1 rounded-r"
//                     >
//                       +
//                     </button>
                    
//                     <button 
//                       onClick={() => handleRemoveItem(product._id)}
//                       className="ml-4 text-red-500 hover:text-red-700"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
//             <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
//             <div className="flex justify-between mb-2">
//               <span>Subtotal ({cart.quantity} items)</span>
//               <span>${cart.total.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-4">
//               <span>Shipping</span>
//               <span>Free</span>
//             </div>
//             <div className="border-t pt-4">
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>${cart.total.toFixed(2)}</span>
//               </div>
//             </div>
//             <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg mt-6">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <div className="w-64 h-64 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
//           <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
//             Continue Shopping
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;





import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, updateQuantity } from "../components/CartSlice";
import "../Styling/Cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, newQuantity }));
    } else {
      dispatch(removeProduct(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cart.products.length > 0 ? (
        <div className="cart-items">
          <div className="cart-list">
            {cart.products.map((product) => (
              <div key={product._id} className="cart-item">
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(product._id, product.quantity, -1)} className="quantity-btn">-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleQuantityChange(product._id, product.quantity, 1)} className="quantity-btn">+</button>
                    <button onClick={() => handleRemoveItem(product._id)} className="remove-btn">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal ({cart.quantity} items)</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-line total">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="empty-cart-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="empty-cart-title">Your cart is empty</h3>
          <p className="empty-cart-subtitle">Looks like you haven't added anything to your cart yet</p>
          <button className="continue-shopping-btn">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

