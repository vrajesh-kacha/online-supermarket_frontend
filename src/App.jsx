
import {Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Pagenotfound from "./components/pages/Pagenotfound.jsx";
import Register from "./components/pages/authentication/Register.jsx";
import Login from "./components/pages/authentication/Login.jsx";
import PrivateRoute from "./components/pages/authentication/private.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import Admin from "./components/pages/authentication/Admin.jsx";
import CreateCategory from "./components/pages/ManageCategory.jsx";
import CreateProduct from "./components/pages/CreateProduct.jsx";
import Users from "./components/pages/User.jsx";
import Profile from "./components/pages/Profile.jsx";
import "antd/dist/reset.css";
import Products from "./components/pages/Products.jsx";
import PaymentSuccess from "./components/pages/PaymentSuccess.jsx";
import AdminProfile from "./components/pages/AdminProfile.jsx";
import Cart from "./components/pages/Cart.jsx";
import Layout from "./components/pages/layouts/Layout.jsx";
const App = () => {
  return (
    <>
      <Routes>
      <Route element={<Layout />}>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
       
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="paymentSuccess" element={<PaymentSuccess/>}/>
        </Route>
        <Route path="/dashboard" element={<Admin />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/profile" element={<AdminProfile/>} />
        </Route>
        </Route>
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
};

export default App;
