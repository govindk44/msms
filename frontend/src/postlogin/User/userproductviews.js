import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../Admin/Navbar'; 
import axios from "axios";


const UserProductViews = () => {
    const [medicines, setMedicines] = useState([]); 
    const [cart, setCart] = useState([]); 
    const navigate = useNavigate(); 

    const fetchMedicines = async () => {
        try {
            const response = await fetch('http://localhost:8000/medical_store_app/api/medicine/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMedicines(data); 
            console.log('Fetched Medicines:', data); 
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };
    useEffect(() => {
        fetchMedicines(); 
    }, []);

    const handleAddToCart = async (medicine) => {
        console.log(medicine)
        try {
          await axios.post(`http://localhost:8000/medical_store_app/cart/add/${medicine['id']}/${sessionStorage.getItem('user_id')}`);
          setCart((prevCart) => [...prevCart, medicine]);
        } catch (error) {
          console.error("Error adding item to cart:", error);
        }
      };
    
    const handleBuyNow = async (medicine) => {
        try {
            await axios.post(`http://localhost:8000/medical_store_app/cart/add/${medicine['id']}/${sessionStorage.getItem('user_id')}`);  
            console.log('Buying now:', medicine);
            
            navigate('/cart');
        } catch (error) {
            console.error('Error handling Buy Now:', error);
        }
    };
    

    return (
        <div style={styles.container}>
            <Navbar cartCount={cart.length} /> 
            <h1 style={styles.title}>Available Medicines</h1>
            {medicines.length === 0 ? (
                <p style={styles.noMedicines}>No medicines found.</p>
            ) : (
                <div style={styles.productsContainer}>
                    {medicines.map((medicine) => (
                        <div key={medicine.id} style={styles.productCard}>
                            <h3 style={styles.productName}>{medicine.name}</h3>
                            <p style={styles.productDescription}>{medicine.description}</p>
                            <p style={styles.productPrice}>Price: ₹{medicine.price}</p>
                            <div>
                                <button
                                    onClick={() => handleAddToCart(medicine)}
                                    style={styles.addToCartButton}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => handleBuyNow(medicine)} 
                                    style={styles.buyNowButton}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '80px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    noMedicines: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#555',
    },
    productsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
    productCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        width: '200px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        transition: 'transform 0.3s ease-in-out',
    },
    productCardHover: {
        transform: 'scale(1.05)',
    },
    productName: {
        marginBottom: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    productDescription: {
        marginBottom: '10px',
        color: '#777',
        fontSize: '14px',
    },
    productPrice: {
        marginBottom: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#28a745',
    },
    addToCartButton: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px',
        transition: 'background-color 0.3s ease',
    },
    addToCartButtonHover: {
        backgroundColor: '#218838',
    },
    buyNowButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buyNowButtonHover: {
        backgroundColor: '#0056b3',
    },
};

export default UserProductViews;
