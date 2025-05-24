import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const titleMap = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/login": "Login",
  "/register": "Register",
  "/dashboard/profile": "User Profile",
  "/dashboard/cart": "Your Cart",
  "/dashboard/paymentsuccess": "Payment Success",
  "/dashboard/admin": "Admin Dashboard",
  "/dashboard/admin/create-category": "Create Category",
  "/dashboard/admin/create-product": "Create Product",
  "/dashboard/admin/products": "Manage Products",
  "/dashboard/admin/users": "Manage Users",
  "/dashboard/admin/profile": "Admin Profile",
  "*": "Page Not Found",
};

const Layout = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("My App");

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    setPageTitle(titleMap[path] || "My App");
  }, [location]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
      </Helmet>
      <Header />
      <Toaster />
      <main className="flex-grow-1 container my-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
