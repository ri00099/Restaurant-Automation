import React from 'react';
import '../../style/homePage/TodaysSpecial.css';

const TodaysMenu = () => {
  const specialFood = [
    {
      id: 1,
      image: 'https://plus.unsplash.com/premium_photo-1664391779617-c81011293ef6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fENyaXNweSUyMEZyaWVkJTIwQ2hpY2tlbiUyMEJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Crispy Fried Chicken Burger',
      description: 'A crunchy delight with fresh veggies and signature mayo.',
      price: '$8.50'
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/1200x/4a/af/5c/4aaf5cb2f245c0ff2505a36237c0d02a.jpg',
      title: 'Signature Seafood Pasta',
      description: 'Classic Italian pasta with fresh seafood flavors.',
      price: '$12.50'
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/736x/ab/e6/57/abe65721a6d06545c99230151aab0177.jpg',
      title: 'Gourmet Vegetarian Pizza',
      description: 'Loaded with veggies, cheese, and Italian herbs.',
      price: '$10.00'
    },
    {
      id: 4,
      image: 'https://i.pinimg.com/1200x/0c/e1/4e/0ce14e1ef631166a411c20a62f32618f.jpg',
      title: 'Chocolate Lava Cake',
      description: 'Molten chocolate with soft sponge sweetness.',
      price: '$6.75'
    }
  ];

  const handleOrder = (itemTitle) => {
    alert(`Ordering ${itemTitle}`);
    // Add your order logic here
  };

  return (
    <section className="specials-section">
      <h2 className="page-title">Today's Irresistible Specials</h2>

      <div className="specials-grid">
        {specialFood.map((item) => (
          <div key={item.id} className="special-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="special-footer">
              <span>{item.price}</span>
              <button onClick={() => handleOrder(item.title)}>Order</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysMenu;