// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/ShopPage';
import JoinAsFarmerPage from '../pages/JoinAsFarmer'; // Create this page
import ContactForm from '../pages/ContactForm';

function App() {
  return (
    <Router>
      <div>
        {/* Global Navigation */}
        <header className="header">
          <div className="logo">🌾 Raitabandhu</div>
          <nav className="nav">
            <Link to="/" className="navLink">Home</Link>
            <Link to="/shop" className="navLink">Shop</Link>
            <Link to="/join" className="navLink">Join Now</Link>
            <Link to="/contact" className="navLink">Contact</Link>
            <button className="signInButton">SignIn</button>
          </nav>
        </header>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<HomePage />} />
          <Route path="/join" element={<JoinAsFarmerPage />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
