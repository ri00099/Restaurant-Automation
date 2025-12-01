import React from "react";
import "../../../style/MenuPage/QuickViewModal.css";
import CategoryBadge from "./CategoryBadge.jsx";

const QuickViewModal = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const handleAddToCart = () => {
    onAddToCart(item);
    onClose(); // Close modal after adding to cart
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image-container">
          <img src={item.image} alt={item.name} className="modal-image" />
          <button onClick={onClose} className="modal-close-btn">
            ✕
          </button>
          <div className="modal-badge">
            <CategoryBadge category={item.category} />
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">{item.name}</h2>
            <span className="modal-price">${item.price}</span>
          </div>

          <p className="modal-description">{item.description}</p>

          <div className="modal-stats">
            <div className="stat-item">
              <div className="stat-value">
                <span className="star-icon">★</span>
                <span className="stat-number">{item.rating}</span>
              </div>
              <p className="stat-label">{item.reviews} reviews</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                <span className="clock-icon">🕐</span>
                <span className="stat-number">{item.prepTime}</span>
              </div>
              <p className="stat-label">Prep time</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                <span className="chef-icon">👨‍🍳</span>
                <span className="stat-number">{item.popularity}%</span>
              </div>
              <p className="stat-label">Popularity</p>
            </div>
          </div>

          <div className="modal-ingredients">
            <h3 className="ingredients-title">Ingredients</h3>
            <div className="ingredients-list">
              {item.ingredients.map((ingredient, index) => (
                <span key={index} className="ingredient-tag">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <button className="modal-add-cart-btn" onClick={handleAddToCart}>
            Add to Cart - ${item.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;