import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/medical_store_app/payment_details/"
        );
        console.log("API Response: ", response.data);

        if (response.data.paymentDetails && response.data.paymentDetails.length > 0) {
          setPaymentDetails(response.data.paymentDetails);
          setIsDataAvailable(true);
        } else {
          setIsDataAvailable(false);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setIsDataAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  return (
    <div style={styles.containerStyle}>
      <h1 style={styles.titleStyle}>Booking Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !isDataAvailable ? (
        <p style={styles.errorStyle}>No booking details available.</p>
      ) : (
        <table style={styles.tableStyle}>
          <thead>
            <tr>
              <th style={styles.headerStyle}>Field</th>
              <th style={styles.headerStyle}>Value</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((payment, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td style={styles.cellStyle}>User</td>
                  <td style={styles.cellStyle}>{payment.user || "N/A"}</td>
                </tr>
                <tr>
                  <td style={styles.cellStyle}>Amount</td>
                  <td style={styles.cellStyle}>{payment.amount || "N/A"}</td>
                </tr>
                <tr>
                  <td style={styles.cellStyle}>Payment ID</td>
                  <td style={styles.cellStyle}>{payment.razorpay_payment_id || "N/A"}</td>
                </tr>
                <tr>
                  <td style={styles.cellStyle}>Order ID</td>
                  <td style={styles.cellStyle}>{payment.razorpay_order_id || "N/A"}</td>
                </tr>
                <tr>
                  <td style={styles.cellStyle}>Status</td>
                  <td style={styles.cellStyle}>{payment.status || "N/A"}</td>  
                </tr>
                <tr>
                  <td style={styles.cellStyle}>Created At</td>
                  <td style={styles.cellStyle}>{payment.created_at || "N/A"}</td>
                </tr>
                <tr>
                  <td colSpan="2" style={styles.cellStyle}>
                    <hr />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  containerStyle: {
    margin: "50px auto",
    padding: "20px",
    maxWidth: "800px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  titleStyle: {
    textAlign: "center",
    marginBottom: "20px",
  },
  tableStyle: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerStyle: {
    borderBottom: "2px solid #000",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  cellStyle: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  errorStyle: {
    textAlign: "center",
    color: "red",
    fontSize: "18px",
  },
};

export default Booking;
