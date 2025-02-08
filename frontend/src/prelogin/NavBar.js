import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Handle Logout: Clear session and redirect to login
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      navigate("/login");
    }
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
    button: {
      color: "white",
      background: "transparent",
      border: "none",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "underline",
      padding: "10px 20px",
    },
  };

  // Check if user is logged in
  const isLoggedIn = !!sessionStorage.getItem("user_id");
  const userName = sessionStorage.getItem("name") || "User";

  return (
    <header style={styles.navbar}>
      <Link to={isLoggedIn ? "/UserProductViews" : "/"} style={styles.logo}>
        Online Medical Shop
      </Link>
      <nav style={styles.navLinks}>
        {isLoggedIn ? (
          <>
            <button style={styles.button} onClick={() => navigate("/mybooking")}>
              View Bookings
            </button>
            <button
              style={styles.button}
              onClick={() => navigate("/ChangePassword")}
            >
              Change Password
            </button>
            <span style={styles.welcomeText} onClick={handleLogout}>
              <i className="bi bi-person-circle"></i> Welcome, {userName}
            </span>
          </>
        ) : (
          <Link to="/login" style={styles.navLink}>
            <i className="bi bi-person-circle"></i> Login / Register
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
