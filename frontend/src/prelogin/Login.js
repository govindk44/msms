import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../axios";
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const navigate = useNavigate();
  const [formvalues, setformvalues] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    setformvalues({ ...formvalues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formvalues.username || !formvalues.password) {
      setFormError("Username and password are required.");
      return;
    }

    setIsLoading(true);

    axios
      .post(apiUrl + "/medical_store_app/login/", formvalues)
      .then((response) => {
        sessionStorage.setItem("access_token", response.data.access);
        sessionStorage.setItem("refresh_token", response.data.refresh);

        const user = jwtDecode(response.data.access);
        const userId = user.user_id;
        const username = user.name;
        const user_type = user.user_type;

        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;

        sessionStorage.setItem("user_id", userId);
        sessionStorage.setItem("name", username);
        sessionStorage.setItem("user_type", user_type);

        if (user_type === "admin") {
          alert("Admin login successfully!");
          navigate("/admin/User");
        } else if (user_type === "user") {
          alert("User login successfully!");
          navigate("/UserProductViews");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setFormError(error.response.data.detail || "Invalid credentials.");
        } else {
          setFormError("An unexpected error occurred. Please try again.");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
      backgroundColor: '#f4f4f4',
    },
    form: {
      background: '#fff',
      padding: '40px',
      borderRadius: '6px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      width: '370px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '11px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '11px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#ff9800',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    switchButton: {
      marginTop: '10px',
      padding: '10px',
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    registerLink: {
      textDecoration: 'none',
      color: '#007bff',
    }
  };

  return (
    <div>
      <div className="container mt-5 p-4" style={styles.container}>
        <form onSubmit={onSubmit} method="post" className="form" style={styles.form}>
          <div className="row mt-3 mb-3">
            <h4 className="text-center" style={styles.heading}>
              <i className="bi bi-person-circle px-3"></i>Login
            </h4>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="username" className="form-label" style={styles.label}>
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                required
                className="form-control"
                style={styles.input}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="password" className="form-label" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                placeholder="password"
                className="form-control"
                style={styles.input}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          {formError && <p style={styles.error}>{formError}</p>}
          <p>
            New User? <Link to="/register" style={styles.registerLink}>Register here</Link>
          </p>
          <div className="row mb-3">
            <div className="col">
              <button
                type="submit"
                className="btn btn-dark col-3"
                style={styles.button}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
