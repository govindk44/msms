import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const API_BASE_URL = "http://localhost:8000/medical_store_app/api";

export default function HomePage() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
    checkAuthentication(); 
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medicines/`);
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `₹{API_BASE_URL}/medicines/?search=${searchTerm}`
      );
      setMedicines(response.data);
    } catch (error) {
      console.error("Error searching medicines:", error);
    }
  };

  const handleAddToCart = (medicine) => {
    if (!isAuthenticated) {
      alert("Please log in to add items to your cart.");
      navigate("/login"); 
      return;
    }
    setCart((prevCart) => [...prevCart, medicine]);
    alert(`₹{medicine.name} added to cart!`);
  };


  return (
    <div className="homepage">
      <section id="home" className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search medicines..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </section>

      <main id="medicines" className="main-content">
        <h2>Welcome to Our Medical Store</h2>
        <p>Find the best medicines at affordable prices.</p>
        <div className="medicine-list">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="medicine-item">
              <h3>{medicine.name}</h3>
              <p>{medicine.description}</p>
              <p>Price: ₹{medicine.price}</p>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(medicine)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <section id="about" className="about-us">
          <h2>About Us</h2>
          <p>
            We are a trusted medical store offering a wide range of medicines
            to ensure your health and wellness. Our goal is to provide
            high-quality medicines at affordable prices for everyone.
          </p>
        </section>

        <section id="contact" className="contact-us">
          <h2>Contact Us</h2>
          <p>If you have any questions, feel free to reach out to us:</p>
          <p>Email: support@medicalstore.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Health St, xyz city</p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Medical Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
