import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicineBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/medical_store_app/payment_details/"
      );
      console.log("API Response:", response);
      if (response.data && Array.isArray(response.data.paymentDetails)) {
        setBookings(
          response.data.paymentDetails.map((booking) => ({
            user: booking.user || "Unknown",
            id: booking.razorpay_order_id || "Unknown",
            amount: booking.amount || "0.00",
            paymentId: booking.razorpay_payment_id || "N/A",
            status: booking.status || "Pending",
          }))
        );
      } else {
        console.error("Unexpected response format:", response.data);
        setError("Unexpected response format. Please contact support.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/medical_store_app/update_payment_status/",
        {
          razorpay_order_id: orderId,  
          status: newStatus,  
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Payment status updated:", response.data);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === orderId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error.response?.data || error.message);
      setError("Failed to update payment status. Please try again.");
    }
  };
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return { color: "blue", fontWeight: "bold" };
      case "completed":
        return { color: "green", fontWeight: "bold" };
      case "failed":
        return { color: "red", fontWeight: "bold" };
      case "pending":
      default:
        return { color: "orange", fontWeight: "bold" };
    }
  };

  return (
    <div style={{ margin: "0 auto", padding: "80px", maxWidth: "1200px", textAlign: "center" }}>
      <h2>Medicine Bookings (Admin)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table style={{ border: "1px solid black", width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={headerStyle}>User</th>
              <th style={headerStyle}>Order ID</th>
              <th style={headerStyle}>Amount</th>
              <th style={headerStyle}>Payment ID</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", fontStyle: "italic", padding: "16px" }}>
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={index}>
                  <td style={cellStyle}>{booking.user}</td>
                  <td style={cellStyle}>{booking.id}</td>
                  <td style={cellStyle}>{booking.amount}</td>
                  <td style={cellStyle}>{booking.paymentId}</td>
                  <td style={{ ...cellStyle, ...getStatusStyle(booking.status) }}>{booking.status}</td>
                  <td style={cellStyle}>
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      style={{ padding: "5px" }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const headerStyle = {
  backgroundColor: "#f2f2f2",
  fontWeight: "bold",
  textAlign: "left",
  border: "1px solid black",
  padding: "8px",
};

const cellStyle = {
  border: "1px solid black",
  padding: "8px",
};

export default MedicineBookings;
