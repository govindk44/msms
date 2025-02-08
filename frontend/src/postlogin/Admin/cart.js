import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const navigate = useNavigate();

  const user_data = useMemo(() => ({ user_id: sessionStorage.getItem("user_id") }), []);

  const fetchCart = useCallback(async () => {
    if (!user_data.user_id) return;

    try {
      const response = await axios.post("http://localhost:8000/medical_store_app/cart/", user_data);
      const { cart_items, total_price } = response.data;
      setCartItems(cart_items || []);
      setTotalPrice(total_price || 0);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, [user_data]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemoveFromCart = async (cartId) => {
    try {
      await axios.post(
        `http://localhost:8000/medical_store_app/cart/remove/${cartId}/${sessionStorage.getItem("user_id")}`
      );
      fetchCart();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleFileUpload = async (event, cartId) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("prescription", file);

      try {
        await axios.post(
          `http://localhost:8000/medical_store_app/cart/upload_prescription/${cartId}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setUploadedFiles((prevFiles) => ({
          ...prevFiles,
          [cartId]: file.name,
        }));
      } catch (error) {
        console.error("Error uploading prescription:", error);
      }
    }
  };

  const handleContinueShopping = () => {
    navigate("/UserProductViews");
  };

  const handleProceedToCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/medical_store_app/create_order/",
        user_data
      );
      setCartItems([]);
      setTotalPrice(0);
      navigate("/checkout", { state: { order: response.data.order, totalPrice } });
    } catch (error) {
      console.error("Error booking order:", error);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.continueShoppingButton} onClick={handleContinueShopping}>
        Continue Shopping
      </button>
      <h1 style={styles.heading}>Your Cart</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Medicine</th>
            <th style={styles.tableHeader}>Quantity</th>
            <th style={styles.tableHeader}>Prescription</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.medicine.name}</td>
              <td>{item.quantity}</td>
              <td>
                {uploadedFiles[item.id] ? (
                  <span>{uploadedFiles[item.id]}</span>
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, item.id)}
                    style={styles.fileInput}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleRemoveFromCart(item.id)} style={styles.button}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={styles.total}>Total: ₹{totalPrice}</h3>
      <div style={styles.BookContainer}>
        <button
          style={styles.paymentButton}
          onClick={handleProceedToCheckout}
          disabled={
            cartItems.length === 0 || cartItems.some((item) => !uploadedFiles[item.id])
          }
        >
          Proceed to Booking
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "70px", fontFamily: "Arial, sans-serif" },
  continueShoppingButton: { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "10px 20px", fontSize: "1rem", borderRadius: "5px", cursor: "pointer" },
  heading: { textAlign: "center", fontSize: "2rem", marginBottom: "20px" },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: "20px" },
  tableHeader: { backgroundColor: "#f4f4f4", padding: "10px", textAlign: "left", fontWeight: "bold" },
  button: { backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" },
  total: { fontSize: "1.5rem", textAlign: "right", marginTop: "20px", fontWeight: "bold" },
  BookContainer: { display: "flex", justifyContent: "center", marginTop: "20px" },
  paymentButton: { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "10px 20px", fontSize: "1rem", borderRadius: "5px", cursor: "pointer" },
  fileInput: { fontSize: "1rem" },
};

export default Cart;
