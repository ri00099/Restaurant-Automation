import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../components/ToastContainer';
import '../../style/MenuPage/Menu.css';
import FoodCard from '../MenuPage/Components/FoodCard';
import QuickViewModal from '../MenuPage/Components/QuickViewModal';
import FilterBar from './Components/FilterBar.jsx';
import { menuItems } from './Components/menuData.js';

const Menu = () => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Filter and Sort Logic
  const filteredItems = useMemo(() => {
    let items = menuItems;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort items
    items = [...items].sort((a, b) => {
      switch (sortBy) {
        case 'priceLowHigh':
          return a.price - b.price;
        case 'priceHighLow':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });
    
    return items;
  }, [searchQuery, selectedCategory, sortBy]);
  
  const handleAddToCart = (item) => {
    addToCart(item);
    // Show toast notification
    addToast(`${item.name} added to cart!`, 'cart');
  };
  
  return (
    <div className="menu-container">
      <div className="menu-content">
        {/* Header */}
        <div className="menu-header">
          <h1 className="menu-title">Our Delicious Menu</h1>
          <p className="menu-subtitle">
            Explore a wide selection of dishes crafted with the freshest ingredients.
          </p>
        </div>
        
        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        {/* Results Count */}
        <div className="results-count">
          <p className="results-text">
            Showing <span className="results-number">{filteredItems.length}</span> dishes
          </p>
        </div>
        
        {/* Food Grid */}
        {filteredItems.length > 0 ? (
          <div className="food-grid">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onQuickView={setSelectedItem}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🍽️</div>
            <h3 className="no-results-title">No dishes found</h3>
            <p className="no-results-text">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Quick View Modal */}
        {selectedItem && (
          <QuickViewModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;