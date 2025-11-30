import { useState } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import useCart hook
import "../style/Navbar.css";

export default function Navbar({ isAdmin = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart(); // Get cart count
  const cartCount = getCartCount();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Orders", path: "/order" },
    { name: "Contact", path: "/contact" },
  ];

  // Add admin items conditionally
  if (isAdmin) {
    navItems.splice(4, 0,
      { name: "Kitchen", path: "/kitchen" },
      { name: "Admin", path: "/dashboard" }
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          
          {/* Logo */}
          <div className="navbar-logo">
            <div className="logo-icon">
              <UtensilsCrossed className="icon" />
            </div>
            <span className="logo-text">DineFlow</span>
          </div>

          {/* Desktop Menu */}
          <div className="navFlex">
            <div className="navbar-menu">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="nav-link flex items-center gap-2"
                >
                  {item.icon ? item.icon : item.name}
                </Link>
              ))}
            </div>
            
            <div className="navbar-menu">
              <Link
                to="/cart"
                className="nav-link cart-link flex items-center gap-2"
              >
                <GiShoppingCart size={26} className="cart-icon" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-button">
            <button onClick={() => setIsOpen(!isOpen)} className="menu-toggle">
              {isOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-items">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="mobile-nav-link flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon ? item.icon : item.name}
                </Link>
              ))}
              <Link
                to="/cart"
                className="mobile-nav-link cart-link-mobile flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <GiShoppingCart size={24} className="cart-icon" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="cart-badge-mobile">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}