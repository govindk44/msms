import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, totalPrice, clearCart } = location.state;

  useEffect(() => {
    if (!order || !totalPrice) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      const initializeRazorpay = () => {
        const options = {
          key: "rzp_test_a6hVvFHJbT9SAO", 
          amount: totalPrice * 100, 
          currency: "INR",
          name: "Medical Store",
          description: `Payment for Order #₹{order.id}`,
          order_id: order.id,
          handler: async function (response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            alert("Payment successful!");

            const paymentData = {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              amount: totalPrice * 100,
            };
            try {
              await axios.post("http://localhost:8000/medical_store_app/payment_details/", paymentData);
              
              if (clearCart) {
                clearCart();
              }
              razorpay.close();

              navigate("/booking", {
                state: {
                  order,
                  paymentDetails: paymentData,
                },
              });
            } catch (error) {
              console.error("Error processing payment:", error);
              alert("Payment processing failed.");
            }
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      initializeRazorpay();
    };

    script.onerror = () => {
      alert("Failed to load Razorpay script.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [order, totalPrice, navigate, clearCart]);

  if (!order || !totalPrice) {
    return <div style={styles.error}>Error: Missing order or total price details.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>
      <p style={styles.message}>Your payment is being processed, please wait...</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    color: '#555',
  },
  error: {
    color: 'red',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default Checkout;
