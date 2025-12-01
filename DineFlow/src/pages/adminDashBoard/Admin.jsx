import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../style/adminPage/admin.css';

const AdminDashboard = () => {
  // State for menu management
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'categories'
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Menu items state
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Classic Cheeseburger', category: 'Main Course', image: '🍔', price: 12.99 },
    { id: 2, name: 'Margarita Pizza', category: 'Main Course', image: '🍕', price: 14.99 },
    { id: 3, name: 'Caesar Salad', category: 'Salad', image: '🥗', price: 8.99 },
    { id: 4, name: 'Pasta Carbonara', category: 'Main Course', image: '🍝', price: 13.99 },
    { id: 5, name: 'Greek Salad', category: 'Salad', image: '🥗', price: 9.99 }
  ]);

  // Categories state
  const [categories, setCategories] = useState([
    { id: 1, name: 'Main Course', itemCount: 3 },
    { id: 2, name: 'Salad', itemCount: 2 },
    { id: 3, name: 'Dessert', itemCount: 0 },
    { id: 4, name: 'Beverages', itemCount: 0 }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '🍔',
    price: ''
  });

  // Sample data for charts
  const ordersData = [
    { name: 'Mon', orders: 20 },
    { name: 'Tue', orders: 45 },
    { name: 'Wed', orders: 30 },
    { name: 'Thu', orders: 60 },
    { name: 'Fri', orders: 40 },
    { name: 'Sat', orders: 55 },
    { name: 'Sun', orders: 35 }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 350 },
    { name: 'Feb', revenue: 280 },
    { name: 'Mar', revenue: 240 },
    { name: 'Apr', revenue: 200 },
    { name: 'May', revenue: 180 },
    { name: 'June', revenue: 180 },
    { name: 'July', revenue: 180 },
    { name: 'Aug', revenue: 200 },
    { name: 'Sep', revenue: 240 },
    { name: 'Oct', revenue: 280 },
    { name: 'Nov', revenue: 180 },
    { name: 'Dec', revenue: 350 },
  ];

  const recentOrders = [
    { id: 'ORD0001', customer: 'Sarah Smith', items: 'Ya Amigo, 3x Coke', price: '$48.20', status: 'Completed', actions: 3 },
    { id: 'ORD0002', customer: 'Mike Johnson', items: '2x Burger, 1x Coke', price: '$35.00', status: 'Pending', actions: 3 },
    { id: 'ORD0003', customer: 'Crystal Water', items: '1x Salad Plate, 1x Water', price: '$22.00', status: 'Pending', actions: 3 },
    { id: 'ORD0004', customer: 'Diana Parker', items: '1x Sushi Plate, 2x Green...', price: '$67.50', status: 'Completed', actions: 3 },
    { id: 'ORD0005', customer: 'Sara Garcia', items: '2x Burger, 2x Bourbon', price: '$57.75', status: 'Cancelled', actions: 3 },
    { id: 'ORD0001', customer: 'Sarah Smith', items: 'Ya Amigo, 3x Coke', price: '$48.20', status: 'Completed', actions: 3 },
    { id: 'ORD0002', customer: 'Mike Johnson', items: '2x Burger, 1x Coke', price: '$35.00', status: 'Pending', actions: 3 },
    { id: 'ORD0003', customer: 'Crystal Water', items: '1x Salad Plate, 1x Water', price: '$22.00', status: 'Pending', actions: 3 },
    { id: 'ORD0004', customer: 'Diana Parker', items: '1x Sushi Plate, 2x Green...', price: '$67.50', status: 'Completed', actions: 3 },
    { id: 'ORD0005', customer: 'Sara Garcia', items: '2x Burger, 2x Bourbon', price: '$57.75', status: 'Cancelled', actions: 3 }
  ];

  // Filter menu items based on search
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle add new item
  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({ name: '', category: '', image: '🍔', price: '' });
    setShowAddModal(true);
  };

  // Handle edit item
  const handleEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'menu') {
      setFormData({
        name: item.name,
        category: item.category,
        image: item.image,
        price: item.price
      });
    } else {
      setFormData({
        name: item.name,
        category: '',
        image: '',
        price: ''
      });
    }
    setShowAddModal(true);
  };

  // Handle delete item
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'menu') {
        setMenuItems(menuItems.filter(item => item.id !== id));
      } else {
        setCategories(categories.filter(cat => cat.id !== id));
      }
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'menu') {
      if (editingItem) {
        // Update existing menu item
        setMenuItems(menuItems.map(item =>
          item.id === editingItem.id
            ? { ...item, ...formData, price: parseFloat(formData.price) }
            : item
        ));
      } else {
        // Add new menu item
        const newItem = {
          id: Math.max(...menuItems.map(i => i.id)) + 1,
          ...formData,
          price: parseFloat(formData.price)
        };
        setMenuItems([...menuItems, newItem]);
      }
    } else {
      if (editingItem) {
        // Update existing category
        setCategories(categories.map(cat =>
          cat.id === editingItem.id
            ? { ...cat, name: formData.name }
            : cat
        ));
      } else {
        // Add new category
        const newCategory = {
          id: Math.max(...categories.map(c => c.id)) + 1,
          name: formData.name,
          itemCount: 0
        };
        setCategories([...categories, newCategory]);
      }
    }
    
    setShowAddModal(false);
    setFormData({ name: '', category: '', image: '🍔', price: '' });
  };

  return (
    <div className="admin-dashboard mb-5">
      <main className="main-content">
        <h1 className="page-title">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Orders</span>
              <span className="stat-icon">📦</span>
            </div>
            <div className="stat-value">1,245</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Revenue</span>
              <span className="stat-icon">💵</span>
            </div>
            <div className="stat-value">$45,678</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Avg. Order Value</span>
              <span className="stat-icon">📈</span>
            </div>
            <div className="stat-value">$36.69</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">New Customers</span>
              <span className="stat-icon">👥</span>
            </div>
            <div className="stat-value">189</div>
          </div>
        </div>

        {/* Charts and Menu Section */}
        <div className="content-grid">
          {/* Menu Category Management */}
          <div className="card menu-card mt-5">
            <div className="card-header">
              <h2 className="card-title">Menu & Category Management</h2>
            </div>
            <div className="menu-tabs">
              <button 
                className={`menu-tab ${activeTab === 'menu' ? 'active' : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                Menu Items
              </button>
              <button 
                className={`menu-tab ${activeTab === 'categories' ? 'active' : ''}`}
                onClick={() => setActiveTab('categories')}
              >
                Categories
              </button>
            </div>
            <div className="search-box">
              <input 
                type="text" 
                placeholder={`Search ${activeTab === 'menu' ? 'Item' : 'Categories'}...`}
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-primary" onClick={handleAddNew}>
              + Add New
            </button>
            
            {/* Menu Items List */}
            {activeTab === 'menu' && (
              <div className="menu-list">
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map(item => (
                    <div key={item.id} className="menu-item">
                      <span className="menu-icon">{item.image}</span>
                      <div className="menu-info">
                        <div className="menu-name">{item.name}</div>
                        <div className="menu-category">{item.category} • ${item.price}</div>
                      </div>
                      <div className="menu-actions">
                        <button className="icon-btn" onClick={() => handleEdit(item)}>✏️</button>
                        <button className="icon-btn" onClick={() => handleDelete(item.id)}>🗑️</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No menu items found</div>
                )}
              </div>
            )}

            {/* Categories List */}
            {activeTab === 'categories' && (
              <div className="menu-list">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map(cat => (
                    <div key={cat.id} className="menu-item">
                      <span className="menu-icon">📁</span>
                      <div className="menu-info">
                        <div className="menu-name">{cat.name}</div>
                        <div className="menu-category">{cat.itemCount} items</div>
                      </div>
                      <div className="menu-actions">
                        <button className="icon-btn" onClick={() => handleEdit(cat)}>✏️</button>
                        <button className="icon-btn" onClick={() => handleDelete(cat.id)}>🗑️</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No categories found</div>
                )}
              </div>
            )}
          </div>

          {/* Orders Trend Over Time */}
          <div className="card chart-card mt-5">
            <h2 className="card-title">Orders Trend Over Time</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Category */}
          <div className="card chart-card mt-5">
            <h2 className="card-title">Revenue by Category yearly</h2>
            <p className="chart-subtitle">View detailed revenue by category</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#fb923c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="card orders-table-card mt-5" style={{maxHeight: "780px"}}>
          <h2 className="card-title">Recent Orders</h2>
          <p className="card-subtitle">View and track your recent orders</p>
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.items}</td>
                    <td>{order.price}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-dots">⋮</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit' : 'Add New'} {activeTab === 'menu' ? 'Menu Item' : 'Category'}</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder={`Enter ${activeTab === 'menu' ? 'item' : 'category'} name`}
                />
              </div>
              
              {activeTab === 'menu' && (
                <>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Icon</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Enter emoji (e.g., 🍔)"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      placeholder="0.00"
                    />
                  </div>
                </>
              )}
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;