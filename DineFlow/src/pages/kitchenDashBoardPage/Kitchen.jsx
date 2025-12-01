import React, { useState } from "react";
import "../../style/kitchenDashBoard/kitchen.css";

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
    <div>Kitchen</div>
  )
}

export default Kitchen