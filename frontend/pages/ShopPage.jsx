import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShopPage.css'; // Assuming the CSS is saved in styles.css

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data
  const products = [
    { id: 1, name: 'Organic Tomatoes', farmer: 'Ravi Kumar', price: '₹80/kg', category: 'vegetables', image: '/assets/produce/organic-tomatoes.png' },
    { id: 2, name: 'Fresh Mangoes', farmer: 'Priya Singh', price: '₹150/kg', category: 'fruits', image: '/assets/produce/fresh-mangoes.png' },
    { id: 3, name: 'Organic Rice', farmer: 'Ajith Nair', price: '₹60/kg', category: 'grains', image: '/assets/produce/organic-rice.png' },
    { id: 4, name: 'Farm Fresh Eggs', farmer: 'Lakshmi Devi', price: '₹90/dozen', category: 'dairy', image: '/assets/produce/farm-fresh-egg.png' },
    { id: 5, name: 'Organic Spinach', farmer: 'Mohan Reddy', price: '₹40/bunch', category: 'vegetables', image: '/assets/produce/organic-spinach.png' },
    { id: 6, name: 'Sweet Oranges', farmer: 'Sunita Patil', price: '₹120/kg', category: 'fruits', image: '/assets/produce/sweet-oranges.png' },
    { id: 7, name: 'Pure Honey', farmer: 'Vikram Singh', price: '₹350/bottle', category: 'other', image: '/assets/produce/pure-honey.png' },
    { id: 8, name: 'Fresh Cow Milk', farmer: 'Deepa Sharma', price: '₹60/liter', category: 'dairy', image: '/assets/produce/fresh-cow-milk.png' },
  ];

  const farmers = [
    { id: 1, name: 'Ravi Kumar', location: 'Mysore, Karnataka', image: '/assets/farmers/ravi-kumar.png' },
    { id: 2, name: 'Priya Singh', location: 'Pune, Maharashtra', image: '/assets/farmers/priya-singh.png' },
    { id: 3, name: 'Mohan Reddy', location: 'Warangal, Telangana', image: '/assets/farmers/mohan-reddy.png' },
    { id: 4, name: 'Sunita Patil', location: 'Nashik, Maharashtra', image: '/assets/farmers/sunita-patil.png' },
  ];


  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span>🌾 Raitabandhu</span>
        </div>
        
        <nav className="nav">
          <Link to="/" className="navLink">Home</Link>
          <Link to="/shop" className="navLink">Shop</Link>
          <Link to="/contact" className="navLink">Contact</Link>
          <button className="signInButton">SignIn</button>
        </nav>
      </header>
      
      {/* Hero Section with Search */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Farm Fresh Produce Direct to Your Doorstep</h1>
          <p className="hero-subtitle">
            Support local farmers while enjoying the freshest fruits, vegetables, and more. 
            All sourced directly from farms across India.
          </p>
          
          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search for fruits, vegetables, grains..." 
              className="search-bar" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Browse Fresh Produce</h2>
        
        {/* Category Filters */}
        <div className="category-filter">
          <button 
            className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Products
          </button>
          <button 
            className={`category-button ${selectedCategory === 'vegetables' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('vegetables')}
          >
            Vegetables
          </button>
          <button 
            className={`category-button ${selectedCategory === 'fruits' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('fruits')}
          >
            Fruits
          </button>
          <button 
            className={`category-button ${selectedCategory === 'grains' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('grains')}
          >
            Grains
          </button>
          <button 
            className={`category-button ${selectedCategory === 'dairy' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('dairy')}
          >
            Dairy & Eggs
          </button>
          <button 
            className={`category-button ${selectedCategory === 'other' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('other')}
          >
            Other
          </button>
        </div>
        
        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-farmer">By {product.farmer}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Farmers Section */}
      <section className="farmers-section">
        <div className="farmers-section-content">
          <h2 className="section-title">Meet Our Farmers</h2>
          <div className="farmer-cards">
            {farmers.map(farmer => (
              <div key={farmer.id} className="farmer-card">
                <img src={farmer.image} alt={farmer.name} className="farmer-image" />
                <div className="farmer-info">
                  <h3 className="farmer-name">{farmer.name}</h3>
                  <p className="farmer-location">{farmer.location}</p>
                  <button className="view-profile-button">View Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Browse & Select</h3>
            <p>Choose from our wide range of farm-fresh produce directly sourced from local farmers.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Place Your Order</h3>
            <p>Add items to your cart and checkout with our secure payment options.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Get Fresh Delivery</h3>
            <p>Receive farm-fresh produce delivered right to your doorstep within 24-48 hours.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-content">
          <h2 className="testimonials-title">What Our Customers Say</h2>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The produce is always incredibly fresh and tastes like it was just harvested. I love supporting local farmers through Raita Bandhu!"
              </p>
              <p className="testimonial-author">- Meera Joshi, Bangalore</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "I've been getting weekly vegetable deliveries for 3 months now. The quality is exceptional and prices are fair. Highly recommend!"
              </p>
              <p className="testimonial-author">- Rajesh Verma, Hyderabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Taste the Difference?</h2>
        <p className="cta-text">
          Join thousands of satisfied customers who enjoy fresh, locally grown produce while supporting Indian farmers.
        </p>
        <div className="cta-buttons">
          <button className="primary-button">Start Shopping</button>
          <button className="secondary-button">Join as a Farmer</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footerContent">
          <p>&copy; 2025 Raitabandhu. All rights reserved.</p>
          <nav className="footerNav">
            <a href="#" className="footerLink">Privacy Policy</a>
            <a href="#" className="footerLink">Terms of Service</a>
            <a href="#" className="footerLink">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default ShopPage;