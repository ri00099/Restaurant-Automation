import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import OrderConfirmationModal from "../../components/OrderConfirmationModel";
import "../../style/cartPage/Cart.css";


const Order = () => {
  const { cartItems, updateQuantity, updateInstructions, removeFromCart, clearCart } = useCart();
  
  const [tableNumber, setTableNumber] = useState("Table 1");
  const [overallInstructions, setOverallInstructions] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => calculateSubtotal() * 0.1;

  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const handleCheckout = () => {
    // Generate order ID
    const orderId = 'ORD' + Date.now().toString().slice(-6);
    
    // Prepare order details
    const details = {
      orderId: orderId,
      tableNumber: tableNumber,
      items: cartItems,
      instructions: overallInstructions,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      timestamp: new Date().toISOString()
    };

    setOrderDetails(details);
    setShowConfirmation(true);
    
    // Clear cart after successful order
    clearCart();
    setOverallInstructions("");
  };

  return (
    <div className="order-page">
      <div className="order-container">
        <h1 className="order-title">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3 className="empty-cart-title">Your cart is empty</h3>
            <p className="empty-cart-text">Add some delicious items from our menu!</p>
            <a href="/menu" className="browse-menu-btn">Browse Menu</a>
          </div>
        ) : (
          <div className="order-content">
            <div className="order-items-section">
              {cartItems.map((item) => (
                <OrderItemComponent
                  key={item.id}
                  item={item}
                  onQuantityChange={updateQuantity}
                  onInstructionsChange={updateInstructions}
                  onDelete={removeFromCart}
                />
              ))}
            </div>

            <div className="order-summary-section">
              <OrderSummary
                subtotal={calculateSubtotal()}
                tax={calculateTax()}
                total={calculateTotal()}
                tableNumber={tableNumber}
                onTableNumberChange={setTableNumber}
                overallInstructions={overallInstructions}
                onOverallInstructionsChange={setOverallInstructions}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </div>

      {/* Order Confirmation Modal */}
      {showConfirmation && orderDetails && (
        <OrderConfirmationModal
          orderDetails={orderDetails}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

/* -------------------- Order Item -------------------- */
const OrderItemComponent = ({
  item,
  onQuantityChange,
  onInstructionsChange,
  onDelete,
}) => {
  return (
    <div className="order-item-card">
      <div className="order-item-main">
        <img src={item.image} alt={item.name} className="order-item-image" />

        <div className="order-item-details">
          <h3 className="order-item-name">{item.name}</h3>
          <p className="order-item-description">{item.description}</p>

          <div className="order-item-controls">
            <QuantitySelector
              quantity={item.quantity}
              onDecrease={() => onQuantityChange(item.id, item.quantity - 1)}
              onIncrease={() => onQuantityChange(item.id, item.quantity + 1)}
            />
            <span className="order-item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
          <InstructionsBox
            value={item.instructions}
            onChange={(e) => onInstructionsChange(item.id, e.target.value)}
            placeholder="Special instructions (e.g., no onions, extra spicy)..."
          />
        </div>
        <button className="delete-button" onClick={() => onDelete(item.id)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* -------------------- Quantity Selector -------------------- */
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="quantity-selector">
      <button className="quantity-button" onClick={onDecrease}>
        −
      </button>
      <span className="quantity-value">{quantity}</span>
      <button className="quantity-button" onClick={onIncrease}>
        +
      </button>
    </div>
  );
};

/* -------------------- Instructions -------------------- */
const InstructionsBox = ({ value, onChange, placeholder }) => {
  return (
    <div className="instructions-box">
      <textarea
        className="instructions-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={2}
      />
    </div>
  );
};

/* -------------------- Order Summary -------------------- */
const OrderSummary = ({
  subtotal,
  tax,
  total,
  tableNumber,
  onTableNumberChange,
  overallInstructions,
  onOverallInstructionsChange,
  onCheckout
}) => {
  return (
    <div className="order-summary-card">
      <h2 className="order-summary-title">Order Summary</h2>

      <div className="order-summary-row">
        <span className="summary-label">Subtotal</span>
        <span className="summary-value">${subtotal.toFixed(2)}</span>
      </div>

      <div className="order-summary-row">
        <span className="summary-label">Tax (10%)</span>
        <span className="summary-value">${tax.toFixed(2)}</span>
      </div>

      <div className="order-summary-row total-row">
        <span className="summary-label">Total</span>
        <span className="summary-value total-value">${total.toFixed(2)}</span>
      </div>

      <div className="table-number-section">
        <label className="table-label">Table Number</label>
        <select
          className="table-select"
          value={tableNumber}
          onChange={(e) => onTableNumberChange(e.target.value)}
        >
          <option>Table 1</option>
          <option>Table 2</option>
          <option>Table 3</option>
          <option>Table 4</option>
          <option>Table 5</option>
          <option>Table 6</option>
        </select>
      </div>

      <div className="overall-instructions-section">
        <label className="instructions-label">Overall Instructions</label>
        <textarea
          className="overall-instructions-textarea"
          value={overallInstructions}
          onChange={(e) => onOverallInstructionsChange(e.target.value)}
          placeholder="Add general notes or requests for your order..."
          rows="4"
        />
      </div>

      <button className="checkout-button" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Order;