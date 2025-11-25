import { useState } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import '../style/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Order', href: '#order' },
    { name: 'Contact', href: '#contact' },
    { name: 'Kitchen', href: '#kitchen' },
    { name: 'Admin', href: '#admin' }
  ];

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

          {/* Desktop Navigation */}
          <div className="navbar-menu">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
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
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}