import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (userData.password !== userData.confirmPassword) {
      formErrors.password = "Passwords do not match";
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      formErrors.email = "Invalid email address";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const response = await axios.post('http://localhost:8000/medical_store_app/register/', userData);

      console.log('Registration successful:', response.data);
      navigate("/login");
      alert("user Registration successful")
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setErrors({ ...errors, api: "Registration failed. Please try again." });
    }
  };
  const styles = {
    container: {
      padding:'10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
    },
    form: {
      background: '#fff',
      padding: '16px',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      width: '300px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '6px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    errorText: {
      color: 'red',
      fontSize: '12px',
      marginBottom: '15px',
    },
    button: {
      width: '100%',
      padding: '9px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h2>User Registration</h2>
      <form style={styles.form} onSubmit={handleRegister}>
        <div>
          <label style={styles.label}>
            First Name:
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleInputChange}
              placeholder='first_name'
              required
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <label style={styles.label}>
            Last Name:
            <input
              type="text"
              name="last_name"
              placeholder='last_name'
              value={userData.last_name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <label style={styles.label}>
            Username:
            <input
              type="text"
              name="username"
              placeholder="username"
              value={userData.username}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              required
              style={styles.input}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </label>
        </div>
        <div>
          <label style={styles.label}>
            Password:
            <input
              type="password"
              name="password"
               placeholder="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              value={userData.password}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <label style={styles.label}>
            Confirm Password:
            <input
              type="text"
              name="confirmPassword"
              placeholder="cpassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </label>
        </div>
        {errors.api && <p style={styles.errorText}>{errors.api}</p>}
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;
