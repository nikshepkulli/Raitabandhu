import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ShopPage from '../pages/ShopPage';
import JoinAsFarmerPage from '../pages/JoinAsFarmer';
import ContactForm from '../pages/ContactForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/join" element={<JoinAsFarmerPage />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
  
}

export default App;
