import React from "react";
import "../../style/homePage/Feedback.css";

 const Feedback = () => {
  const testimonials = [
    {
      id: 1,
      text: "It has completely transformed our operations. Orders are smoother, and our kitchen staff loves real-time tracking. Highly recommend!",
      name: "Alice Johnson",
      role: "Restaurant Owner",
      avatar: "https://i.pravatar.cc/150?u=alice",
    },
    {
      id: 2,
      text: "The digital menu is fantastic! Customers love the easy browsing and ordering. It's made a huge difference.",
      name: "Bob Williams",
      role: "Head Chef",
      avatar: "https://i.pravatar.cc/150?u=bob",
    },
    {
      id: 3,
      text: "Efficiency is key in our diner, and it delivers. Billing is quick and dashboards give great insights.",
      name: "Charlie Davis",
      role: "Operations Manager",
      avatar: null,
    },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");

  return (
    <section className="feedback-section" >
      
      <h2 className="feedback-heading">What Our Diners Say</h2>

      <div className="feedback-grid">
        {testimonials.map((t) => (
          <div key={t.id} className="feedback-card">
            <p className="feedback-text">"{t.text}"</p>

            <div className="feedback-user-row">
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} className="feedback-avatar" />
              ) : (
                <div className="feedback-avatar fallback">
                  {getInitials(t.name)}
                </div>
              )}

              <div>
                <p className="feedback-name">{t.name}</p>
                <p className="feedback-role">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </section>
  );
}
export default Feedback