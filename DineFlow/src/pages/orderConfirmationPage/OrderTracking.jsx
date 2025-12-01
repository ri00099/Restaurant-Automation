import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, ChefHat, Utensils, Package, Home, ArrowLeft } from 'lucide-react';
import '../../style/orderConfirmationPage/OrderTracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(0);

  // Simulate order progress
  useEffect(() => {
    const statusTimers = [
      setTimeout(() => setCurrentStatus(1), 3000),  // Preparing after 3s
      setTimeout(() => setCurrentStatus(2), 8000),  // Cooking after 8s
      setTimeout(() => setCurrentStatus(3), 15000), // Ready after 15s
    ];

    return () => statusTimers.forEach(timer => clearTimeout(timer));
  }, []);

  const orderStatuses = [
    {
      id: 0,
      title: 'Order Confirmed',
      description: 'Your order has been received',
      icon: CheckCircle,
      time: 'Just now',
      color: '#10b981'
    },
    {
      id: 1,
      title: 'Preparing',
      description: 'Chef is preparing your order',
      icon: ChefHat,
      time: '2 mins ago',
      color: '#f59e0b'
    },
    {
      id: 2,
      title: 'Cooking',
      description: 'Your food is being cooked',
      icon: Utensils,
      time: '5 mins ago',
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'Ready for Pickup',
      description: 'Your order is ready!',
      icon: Package,
      time: 'Ready',
      color: '#6366f1'
    }
  ];

  // Mock order data
  const orderData = {
    orderId: orderId,
    tableNumber: 'Table 5',
    items: [
      { name: 'Classic Cheeseburger', quantity: 2, price: 12.99 },
      { name: 'Truffle Fries', quantity: 1, price: 7.25 },
      { name: 'Fresh Orange Juice', quantity: 2, price: 6.00 }
    ],
    subtotal: 45.23,
    tax: 4.52,
    total: 49.75,
    estimatedTime: '20-25 mins'
  };

  return (
    <div className="order-tracking-page">
      <div className="tracking-container">
        {/* Header */}
        <div className="tracking-header">
          <button className="back-button" onClick={() => navigate('/menu')}>
            <ArrowLeft size={20} />
            Back to Menu
          </button>
          <h1 className="tracking-title">Track Your Order</h1>
          <p className="tracking-subtitle">Order #{orderData.orderId}</p>
        </div>

        <div className="tracking-content">
          {/* Status Timeline */}
          <div className="status-section">
            <div className="status-timeline">
              {orderStatuses.map((status, index) => {
                const Icon = status.icon;
                const isActive = index <= currentStatus;
                const isCurrent = index === currentStatus;

                return (
                  <div key={status.id} className="status-item">
                    <div className="status-line-wrapper">
                      {index !== 0 && (
                        <div className={`status-line ${isActive ? 'active' : ''}`}></div>
                      )}
                    </div>
                    
                    <div className={`status-icon-wrapper ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                      <Icon 
                        size={24} 
                        className="status-icon"
                        style={{ color: isActive ? status.color : '#9ca3af' }}
                      />
                      {isCurrent && <div className="pulse-ring"></div>}
                    </div>

                    <div className="status-details">
                      <h3 className={`status-title ${isActive ? 'active' : ''}`}>
                        {status.title}
                      </h3>
                      <p className="status-description">{status.description}</p>
                      {isActive && <span className="status-time">{status.time}</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Estimated Time Card */}
            <div className="estimated-card">
              <div className="estimated-icon">
                <Clock size={28} />
              </div>
              <div className="estimated-content">
                <h3 className="estimated-title">Estimated Time</h3>
                <p className="estimated-time">{orderData.estimatedTime}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="order-details-section">
            <div className="details-card">
              <h2 className="details-title">Order Details</h2>
              
              <div className="table-info">
                <Home size={20} />
                <span>{orderData.tableNumber}</span>
              </div>

              <div className="items-list">
                <h3 className="items-title">Items</h3>
                {orderData.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <div className="item-info">
                      <span className="item-quantity">{item.quantity}x</span>
                      <span className="item-name">{item.name}</span>
                    </div>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax (10%)</span>
                  <span className="summary-value">${orderData.tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span className="summary-label">Total</span>
                  <span className="summary-value">${orderData.total.toFixed(2)}</span>
                </div>
              </div>

              <button className="btn-new-order" onClick={() => navigate('/menu')}>
                Place New Order
              </button>
            </div>

            {/* Help Card */}
            <div className="help-card">
              <h3 className="help-title">Need Help?</h3>
              <p className="help-text">
                If you have any questions about your order, please contact our staff.
              </p>
              <button className="btn-contact">Contact Staff</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;