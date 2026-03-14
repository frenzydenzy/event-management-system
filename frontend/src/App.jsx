import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Index from "./pages/index";
import SignupUser from "./pages/SignupUser";
import SignupVendor from "./pages/SignupVendor";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMaintain from "./pages/AdminMaintain";
import VendorDashboard from "./pages/VendorDashboard";
import VendorAddProduct from "./pages/VendorAddProduct";
import VendorStatus from "./pages/VendorStatus";
import VendorRequests from "./pages/VendorRequests";
import VendorProducts from "./pages/VendorProducts";
import UserDashboard from "./pages/UserDashboard";
import UserVendors from "./pages/UserVendors";
import UserProducts from "./pages/UserProducts";
import UserCart from "./pages/UserCart";
import UserCheckout from "./pages/UserCheckout";
import UserRequests from "./pages/UserRequests";
import UserOrderStatus from "./pages/UserOrderStatus";



export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/index" element={<Index />} />

      <Route path="/signup-user" element={<SignupUser />} />
      <Route path="/signup-vendor" element={<SignupVendor />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin-maintain" element={<AdminMaintain />} />
      <Route path="/vendor" element={<VendorDashboard />} />
      <Route path="/vendor/add-product" element={<VendorAddProduct />} />
      <Route path="/vendor/status" element={<VendorStatus />} />
      <Route path="/vendor/requests" element={<VendorRequests />} />
      <Route path="/vendor/products" element={<VendorProducts />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/user/vendors/:category" element={<UserVendors />} />
      <Route path="/user/products/:vendorId" element={<UserProducts />} />
      <Route path="/user/cart" element={<UserCart />} />
      <Route path="/user/checkout" element={<UserCheckout />} />
      <Route path="/user/request-item" element={<UserRequests />} />
      <Route path="/user/order-status" element={<UserOrderStatus />} />
    </Routes>
    </>
  );
}