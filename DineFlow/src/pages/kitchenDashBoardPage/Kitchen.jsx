import React, { useState } from "react";
import "../../style/kitchenDashBoard/Kitchen.css";

const getInitialBoard = () => ({
  pending: [
    {
      id: "DF-001",
      table: "T-05",
      time: "2 minutes ago",
      items: [
        { name: "Classic Burger", qty: 2 },
        { name: "French Fries", qty: 1 }
      ]
    },

    {
      id: "DF-003",
      table: "T-03",
      time: "10 minutes ago",
      items: [
        { name: "Chicken Salad", qty: 1 },
        { name: "Iced Tea", qty: 2 }
      ]
    }
  ],

  inProgress: [
    {
      id: "DF-002",
      table: "T-12",
      time: "Cooking for 8 mins (7 mins left)",
      items: [{ name: "Margherita Pizza", qty: 1 }]
    },

    {
      id: "DF-005",
      table: "T-01",
      time: "Cooking for 15 mins (5 mins left)",
      items: [{ name: "Vegetable Lasagna", qty: 1 }]
    }
  ],

  ready: [
    {
      id: "DF-004",
      table: "T-08",
      time: "Ready for 3 minutes",
      items: [{ name: "Spaghetti Bolognese", qty: 2 }]
    },

    {
      id: "DF-008",
      table: "T-04",
      time: "Ready for 1 minute",
      items: [{ name: "Grilled Salmon", qty: 1 }]
    }
  ],
  
  served: [
    {
      id: "DF-006",
      table: "T-07",
      time: "Served 25 minutes ago",
      items: [
        { name: "Fish and Chips", qty: 2 },
        { name: "Lemonade", qty: 2 }
      ]
    }
  ]
});

function OrderCard({ status, order, onAction }) {
  return (
    <div className={`order-card order-card-${status}`}>
      <div className="order-card-top">
        <h3 className="order-id">Order {order.id}</h3>
        <span className="table-pill">Table {order.table}</span>
      </div>

      <div className="order-meta">
        <span className="meta-label">Items:</span>
      </div>

      <ul className="order-items">
        {order.items.map((item, idx) => (
          <li key={idx}>
            <span className="item-name">• {item.name}</span>
            <span className="item-qty">x{item.qty}</span>
          </li>
        ))}
      </ul>

      <p className="order-time">{order.time}</p>

      {onAction && (
        <button
          className={`order-action-btn btn-${status}`}
          onClick={onAction}
        >
          {status === "pending" && "Start Cooking"}
          {status === "inProgress" && "Mark Ready"}
          {status === "ready" && "Mark Served"}
        </button>
      )}
    </div>
  );
}

export default function KitchenOrderDashboard() {
  const [board, setBoard] = useState(getInitialBoard);

  const moveOrder = (from, to, id) => {
    setBoard(prev => {
      const fromList = [...prev[from]];
      const idx = fromList.findIndex(o => o.id === id);
      if (idx === -1) return prev;

      const [order] = fromList.splice(idx, 1);
      const toList = [...prev[to], order];

      return {
        ...prev,
        [from]: fromList,
        [to]: toList
      };
    });
  };

  const handleRefresh = () => {
    setBoard(getInitialBoard());
  };

  return (
    <div className="kitchen-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Kitchen Order Dashboard</h1>
        <button className="refresh-btn" onClick={handleRefresh}>
          <span className="refresh-icon">↻</span>
          <span>Refresh Orders</span>
        </button>
      </header>

      {/* Columns */}
      <main className="board">
        {/* Pending */}
        <section className="board-column">
          <div className="column-header">
            <span className="column-title">Pending Orders</span>
            <span className="column-count">{board.pending.length}</span>
          </div>

          {board.pending.map(order => (
            <OrderCard
              key={order.id}
              status="pending"
              order={order}
              onAction={() => moveOrder("pending", "inProgress", order.id)}
            />
          ))}
        </section>

        {/* In Progress */}
        <section className="board-column">
          <div className="column-header">
            <span className="column-title">In Progress</span>
            <span className="column-count">{board.inProgress.length}</span>
          </div>

          {board.inProgress.map(order => (
            <OrderCard
              key={order.id}
              status="inProgress"
              order={order}
              onAction={() => moveOrder("inProgress", "ready", order.id)}
            />
          ))}
        </section>

        {/* Ready */}
        <section className="board-column">
          <div className="column-header">
            <span className="column-title">Ready for Pickup</span>
            <span className="column-count">{board.ready.length}</span>
          </div>

          {board.ready.map(order => (
            <OrderCard
              key={order.id}
              status="ready"
              order={order}
              onAction={() => moveOrder("ready", "served", order.id)}
            />
          ))}
        </section>

        {/* Served */}
        <section className="board-column">
          <div className="column-header">
            <span className="column-title">Served</span>
            <span className="column-count">{board.served.length}</span>
          </div>

          {board.served.map(order => (
            <OrderCard
              key={order.id}
              status="served"
              order={order}
              onAction={null}
            />
          ))}
        </section>
      </main>
    </div>
  );
}