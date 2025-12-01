import React from "react";
import "../../style/homePage/Hero.css";

const Hero = () => {
    return (
        <section className="hero" >
            {/* Layer 1 overlay */}
            <div className="overlay"></div>

            {/* Content */}
            <div className="hero-content" >
                <h1>
                    Savor the Moment,
                    <br />
                    Streamline Your Dine
                </h1>

                <p>
                    Experience culinary excellence with your ultimate partner in modern restaurant management and delightful dining.
                </p>

                <div className="buttons">
                    <button className="btn-light">View Menu</button>
                    <button className="btn-primary">Order Now</button>
                </div>
            </div>

            {/* Footer text */}
        </section>
    );
};

export default Hero;
