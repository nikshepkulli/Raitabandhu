import React from 'react';
import farmerImage from '../src/assets/farmer.png'; // Adjust the path as necessary
import './LandingPage.css'; // Import the CSS file
import locationIcon from '../src/assets/locationIcon.png'; // Import the image
import scaleIcon from '../src/assets/scaleIcon.png'; // Import the image
import farmhouseIcon from '../src/assets/farmhouseIcon.png'; // Import the image
const LandingPage = () => {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span>🌾 Raitabandhu</span>
        </div>
        
        <nav className="nav">
          <a href="#" className="navLink">Home</a>
          <a href="#" className="navLink">About</a>
          <a href="#" className="navLink">Contact</a>
          <button className="signInButton">SignIn</button>
        </nav>
      </header>
      
      {/* Hero Section */}
      <section className="heroSection">
        <div className="heroImage">
          <FarmerIllustration />
        </div>
        
        <div className="heroContent">
          <h1 className="heroTitle">Directly from Farmers to You</h1>
          <p className="heroText">
            Support local farmers and get fresh, quality produce delivered to your doorstep.
          </p>
          <button className="ctaButton">Get Started</button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="featuresSection">
        <div className="feature">
          <div className="featureIcon">
            <LocationIcon />
          </div>
          <div>
            <h2 className="featureTitle">Browse Local Produce</h2>
            <p className="featureText">
              Explore a variety of fresh fruits, vegetables, and more from local farmers.
            </p>
          </div>
        </div>
        
        <div className="feature">
          <div className="featureIcon">
            <ScaleIcon />
          </div>
          <div>
            <h2 className="featureTitle">Fair Prices for All</h2>
            <p className="featureText">
              Purchase directly from farmers at prices that benefit both you and the grower.
            </p>
          </div>
        </div>
        
        <div className="feature">
          <div className="featureIcon">
            <FarmhouseIcon />
          </div>
          <div>
            <h2 className="featureTitle">Join as a Farmer</h2>
            <p className="featureText">
              Sign up to sell your produce and reach new customers in your area.
            </p>
          </div>
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

// Icon components
const LocationIcon = () => (
    <img 
    src={locationIcon} 
    alt="Location Icon" 
    style={{ width: '400px', height: '400px', objectFit: 'contain' }} 
  />
);

const ScaleIcon = () => (
    <img 
    src={scaleIcon} 
    alt="Scale Icon" 
    style={{ width: '400px', height: '400px', objectFit: 'contain' }} 
  />
);

const FarmhouseIcon = () => (
    <img 
    src={farmhouseIcon} 
    alt="Farm House Icon" 
    style={{ width: '400px', height: '400px', objectFit: 'contain' }} 
  />
);

// Farmer illustration component
const FarmerIllustration = () => (
  <img 
    src={farmerImage} 
    alt="Farmer Illustration" 
    style={{ width: '250px', height: '300px', objectFit: 'contain' }} 
  />
);

export default LandingPage;