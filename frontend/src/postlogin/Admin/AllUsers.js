import React, { useEffect, useState } from 'react';
import { apiUrl, axiosInstance, generateRefreshToken } from '../../axios';

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axiosInstance
      .get(apiUrl + '/medical_store_app/User')
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          generateRefreshToken(error);
        }
      });
  };


const containerStyle = {
  margin: '40px auto',
  padding: '10px',
  maxWidth: '1000px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '10px',
  color: '#2a2a2a',
  fontWeight: 'bold',
  fontSize: '1.8rem',
  borderBottom: '2px solid #3498db',
  paddingBottom: '10px',
  display: 'inline-block',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const theadStyle = {
  backgroundColor: '#2a2a2a',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
};

const rowStyle = {
  padding: '10px',
  textAlign: 'center',
  fontSize: '1rem',
};

  return (
    <div>
      <div className="row m-3">
        <h1 style={headingStyle}>View Users</h1>
      </div>
      <div style={containerStyle}>
        <div>
          <table style={tableStyle} className="table table-striped">
            <thead style={theadStyle}>
              <tr>
                <th style={rowStyle}>SL No</th>
                <th style={rowStyle}>Name</th>
                <th style={rowStyle}>Last Name</th>
                <th style={rowStyle}>Username</th>
                <th style={rowStyle}>Email</th>
                <th style={rowStyle}>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={`user_rows${i}`}>
                  <td>{i + 1}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.date_joined?.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
