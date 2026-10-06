import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [time, setTime] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((previous) => {
        let { hours, minutes, seconds } = previous;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      name: "Watches",
      icon: "⌚",
      text: "Stylish watches",
    },
    {
      name: "Shoes",
      icon: "👟",
      text: "Latest footwear",
    },
    {
      name: "Electronics",
      icon: "📱",
      text: "Smart technology",
    },
    {
      name: "Fashion",
      icon: "👕",
      text: "Trending fashion",
    },
    {
      name: "Home & Kitchen",
      icon: "🏠",
      text: "Make your home better",
    },
    {
      name: "Beauty",
      icon: "💄",
      text: "Beauty essentials",
    },
    {
      name: "Gaming",
      icon: "🎮",
      text: "Gaming products",
    },
    {
      name: "Sports & Fitness",
      icon: "🏋️",
      text: "Fitness essentials",
    },
  ];

  const deals = [
    {
      name: "Smart Watch",
      price: "₹2,999",
      oldPrice: "₹4,999",
      discount: "40% OFF",
      icon: "⌚",
    },
    {
      name: "Wireless Headphones",
      price: "₹1,999",
      oldPrice: "₹3,999",
      discount: "50% OFF",
      icon: "🎧",
    },
    {
      name: "Running Shoes",
      price: "₹1,799",
      oldPrice: "₹2,999",
      discount: "40% OFF",
      icon: "👟",
    },
    {
      name: "Gaming Mouse",
      price: "₹999",
      oldPrice: "₹1,799",
      discount: "44% OFF",
      icon: "🖱️",
    },
  ];

  return (
    <div className="home-page">

      {/* TOP OFFER */}

      <div className="top-offer">
        🎉 MEGA SALE IS LIVE!
        <strong> Get up to 70% OFF</strong>
        <span> | Free Delivery on orders above ₹999</span>
      </div>

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-small">
            ✨ NEW SEASON COLLECTION
          </span>

          <h1>
            Shop Smarter.
            <br />
            Live Better.
          </h1>

          <p>
            Discover thousands of amazing products
            at unbeatable prices.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="shop-now-button"
            >
              Shop Now →
            </Link>

            <Link
              to="/products"
              className="explore-button"
            >
              Explore Products
            </Link>

          </div>

          <div className="hero-features">

            <div>
              <strong>10K+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>50K+</strong>
              <span>Customers</span>
            </div>

            <div>
              <strong>4.8 ⭐</strong>
              <span>Rating</span>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-circle">
            🛍️
          </div>

          <div className="floating-card card-one">
            🔥 70% OFF
          </div>

          <div className="floating-card card-two">
            🚚 Free Delivery
          </div>

          <div className="floating-card card-three">
            ⭐ Top Rated
          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="home-section">

        <div className="section-heading">

          <div>
            <span>EXPLORE</span>
            <h2>Shop By Category</h2>
          </div>

          <Link to="/products">
            View All →
          </Link>

        </div>

        <div className="category-grid">

          {categories.map((category) => (

            <Link
              to="/products"
              className="home-category-card"
              key={category.name}
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.name}</h3>

              <p>{category.text}</p>

              <span>
                Shop Now →
              </span>

            </Link>

          ))}

        </div>

      </section>

      {/* FLASH SALE */}

      <section className="flash-sale">

        <div className="flash-header">

          <div>

            <span>🔥 LIMITED TIME</span>

            <h2>
              Flash Sale
            </h2>

            <p>
              Grab the deals before they're gone!
            </p>

          </div>

          <div className="countdown">

            <div>
              <strong>
                {String(time.hours).padStart(2, "0")}
              </strong>
              <span>Hours</span>
            </div>

            <b>:</b>

            <div>
              <strong>
                {String(time.minutes).padStart(2, "0")}
              </strong>
              <span>Minutes</span>
            </div>

            <b>:</b>

            <div>
              <strong>
                {String(time.seconds).padStart(2, "0")}
              </strong>
              <span>Seconds</span>
            </div>

          </div>

        </div>

        <div className="deal-grid">

          {deals.map((deal) => (

            <div
              className="deal-card"
              key={deal.name}
            >

              <div className="deal-discount">
                {deal.discount}
              </div>

              <div className="deal-image">
                {deal.icon}
              </div>

              <h3>{deal.name}</h3>

              <div className="deal-price">

                <strong>
                  {deal.price}
                </strong>

                <del>
                  {deal.oldPrice}
                </del>

              </div>

              <div className="deal-stock">
                🔥 Selling fast
              </div>

              <Link
                to="/products"
                className="deal-button"
              >
                Grab Deal
              </Link>

            </div>

          ))}

        </div>

      </section>

      {/* COUPONS */}

      <section className="coupon-section">

        <div className="coupon-content">

          <span>
            🎁 SPECIAL OFFER
          </span>

          <h2>
            Get ₹500 OFF
          </h2>

          <p>
            On your first order above ₹2,999
          </p>

          <div className="coupon-code">
            SHOP500
          </div>

          <button
            onClick={() =>
              navigator.clipboard?.writeText(
                "SHOP500"
              )
            }
          >
            Copy Coupon
          </button>

        </div>

        <div className="coupon-visual">
          🎁
        </div>

      </section>

      {/* NEW ARRIVALS */}

      <section className="home-section">

        <div className="section-heading">

          <div>
            <span>JUST ARRIVED</span>
            <h2>New Arrivals</h2>
          </div>

          <Link to="/products">
            See All →
          </Link>

        </div>

        <div className="arrival-grid">

          <div className="arrival-card">

            <div className="arrival-image">
              📱
            </div>

            <span>NEW</span>

            <h3>
              Latest Smartphone
            </h3>

            <p>
              Powerful performance and
              premium design.
            </p>

            <strong>
              From ₹19,999
            </strong>

          </div>

          <div className="arrival-card">

            <div className="arrival-image">
              🎧
            </div>

            <span>NEW</span>

            <h3>
              Wireless Audio
            </h3>

            <p>
              Crystal clear sound
              everywhere.
            </p>

            <strong>
              From ₹1,499
            </strong>

          </div>

          <div className="arrival-card">

            <div className="arrival-image">
              👟
            </div>

            <span>NEW</span>

            <h3>
              Premium Sneakers
            </h3>

            <p>
              Comfort meets modern
              street style.
            </p>

            <strong>
              From ₹2,499
            </strong>

          </div>

          <div className="arrival-card">

            <div className="arrival-image">
              ⌚
            </div>

            <span>NEW</span>

            <h3>
              Premium Watches
            </h3>

            <p>
              Elegant watches for
              every occasion.
            </p>

            <strong>
              From ₹2,999
            </strong>

          </div>

        </div>

      </section>

      {/* WHY SHOP */}

      <section className="why-section">

        <div className="section-heading center">

          <div>
            <span>WHY CHOOSE US</span>

            <h2>
              Shopping Made Simple
            </h2>
          </div>

        </div>

        <div className="why-grid">

          <div>
            <div>🚚</div>
            <h3>Fast Delivery</h3>
            <p>
              Quick and reliable delivery
              to your doorstep.
            </p>
          </div>

          <div>
            <div>🔒</div>
            <h3>Secure Payment</h3>
            <p>
              Your payment information
              is completely secure.
            </p>
          </div>

          <div>
            <div>↩️</div>
            <h3>Easy Returns</h3>
            <p>
              Simple and hassle-free
              return policy.
            </p>
          </div>

          <div>
            <div>💬</div>
            <h3>24/7 Support</h3>
            <p>
              We're always here to
              help you.
            </p>
          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="final-cta">

        <div>

          <span>
            READY TO SHOP?
          </span>

          <h2>
            Find Something
            You'll Love ❤️
          </h2>

          <p>
            Explore our latest collection
            and discover amazing deals.
          </p>

          <Link
            to="/products"
            className="cta-button"
          >
            Start Shopping →
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;