// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import Header from "./components/Header";
// import ProductForm from "./pages/ProductForm";
// import Admin from "./pages/Admin";
// import Products from "./components/Product";
// // import { CartProvider } from './CartContext';

// function App() {
//   return (
    
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/admin/add" element={<ProductForm />} />
//           <Route path="/admin/edit/:id" element={<ProductForm />} />
//         </Routes>
//       </Router>
    
//   );
// }

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import ProductForm from "./pages/ProductForm";
import Admin from "./pages/Admin";
import Products from "./components/Product";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/contacts" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<ProtectedRoute adminOnly />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/add" element={<ProductForm />} />
                <Route path="/admin/edit/:id" element={<ProductForm />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Router>
    </Provider>
  );
}

export default App;
