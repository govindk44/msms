import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar(props) {
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const navigate = useNavigate();

  
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  
  useEffect(() => {
    if (!sessionStorage.getItem("name")) {
      navigate("/");
    }
  }, [navigate]);

  
  const toggleProductDropdown = () => {
    setShowProductDropdown((prev) => !prev);
  };

  const styles = {
    navbar: {
      background: "#2a2a2a",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      padding: "10px 20px",
      borderRadius: "25px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      background: "rgba(255, 255, 255, 0.1)",
      cursor: "pointer",
    },
    dropdownMenu: {
      position: "absolute",
      top: "50px",
      left: 0,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: "8px",
      padding: "10px 15px",
      zIndex: 1,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    },
    dropdownItem: {
      color: "#333",
      padding: "10px 15px",
      textDecoration: "none",
      display: "block",
      backgroundColor: "#f5f5f5",
      margin: "5px 0",
      borderRadius: "4px",
      transition: "background-color 0.3s ease",
      cursor: "pointer",
    },
    logo: {
      color: "white",
      fontSize: "25px",
      fontWeight: "bold",
      textDecoration: "none",
    },
    welcomeText: {
      color: "white",
      fontSize: "16px",
      marginRight: "45px",
      cursor: "pointer",
    },
  };

  return (
    <header style={styles.navbar}>
      <Link to="/admin/User" style={styles.logo}>
        Online Medical Shop Admin
      </Link>
      <nav style={styles.navLinks}>
        <div style={styles.navLink} onClick={() => navigate("/MedicineBookings")}>
          View Bookings
        </div>
        <div style={styles.navLink} onClick={() => navigate("/ChangePassword")}>
          Change Password
        </div>
        <div style={{ position: "relative" }}>
          <div style={styles.navLink} onClick={toggleProductDropdown}>
            Medicines ▼
          </div>
          {showProductDropdown && (
            <div style={styles.dropdownMenu}>
              <div
                style={styles.dropdownItem}
                onClick={() => {
                  navigate("/ad/AddEditMedicine");
                  setShowProductDropdown(false);
                }}
              >
                Add/Edit Medicine
              </div>
              <div
                style={styles.dropdownItem}
                onClick={() => {
                  navigate("/ListMedicine");
                  setShowProductDropdown(false);
                }}
              >
                List Medicines
              </div>
            </div>
          )}
        </div>
        <span style={styles.welcomeText} onClick={logout}>
          <i className="bi bi-person-circle"></i> Admin, {sessionStorage.getItem("name")}
        </span>
      </nav>
    </header>
  );
}
