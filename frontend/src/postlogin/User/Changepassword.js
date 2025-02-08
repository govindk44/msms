import axios from 'axios';
import React, { useState } from 'react';
import { apiUrl } from '../../axios'; 

export default function ChangePassword() {
  const [formValues, setFormValues] = useState({
    current_password: '',
    change_password: '',
    confirm_password: '',
  });

  const onChangeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues); 
  };

  const callAPI = () => {
    const user_id = sessionStorage.getItem('user_id');
    const data = { ...formValues, user_id };

    axios
      .post(`${apiUrl}/medical_store_app/changepassword/`, data)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.success); 
          setFormValues({
            current_password: '',
            change_password: '',
            confirm_password: '',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          'Error changing password: ' +
            (error.response ? error.response.data.error : 'Unknown error')
        );
      });
  };

  const containerStyle = {
    maxWidth: '300px',
    margin: '0 auto',
    padding: '95px',
    backgroundColor: '#fff',
    borderRadius: '13px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const formGroupStyle = {
    marginBottom: '10px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2a2a2a',
  };

  return (
    <div style={containerStyle}>
      <h1>Change Password</h1>

      <div style={formGroupStyle}>
        <label htmlFor="current_password" style={labelStyle}>
          Current Password
        </label>
        <input
          type="password"
          name="current_password"
          style={inputStyle}
          id="current_password"
          placeholder="Current Password"
          value={formValues.current_password} 
          onChange={onChangeHandler}
        />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="change_password" style={labelStyle}>
          New Password
        </label>
        <input
          type="password"
          name="change_password"
          style={inputStyle}
          id="change_password"
          placeholder="New Password"
          value={formValues.change_password} 
          onChange={onChangeHandler}
        />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="confirm_password" style={labelStyle}>
          Confirm New Password
        </label>
        <input
          type="text"
          name="confirm_password"
          style={inputStyle}
          id="confirm_password"
          placeholder="Confirm New Password"
          value={formValues.confirm_password}
          onChange={onChangeHandler}
        />
      </div>

      <button
        type="button"
        onClick={callAPI}
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Submit
      </button>
    </div>
  );
}
