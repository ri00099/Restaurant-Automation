import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/homePage/Home";
import Menu from "../pages/menuPage/Menu.jsx";
import OrderTracking from "../pages//orderConfirmationPage/OrderTracking.jsx";
import Contact from "../pages/contactAndFeedback/Contact";
import Cart from "../pages/cartPage/Cart";

// Admin Pages
import Kitchen from "../pages/kitchenDashBoardPage/Kitchen";
import Admin from "../pages/adminDashBoard/Admin";

export default function Index({ isAdmin }) {
  return (
    <Routes >
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />

      {/* Admin Only Routes */}
      {isAdmin && (
        <>
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/admin" element={<Admin />} />
        </>
      )}

      {/* Fallback Route (404) */}
      <Route path="*" element={<h1 style={{ padding: "6rem" }}>Page Not Found</h1>} />
    </Routes>
  );
}

