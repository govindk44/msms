import React, { useEffect, useState } from "react";
import { apiUrl, axiosInstance, generateRefreshToken } from "../../axios";

export default function ListMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMedicines = async () => {
    await axiosInstance
      .get(apiUrl + `/medical_store_app/medicine/`)
      .then((response) => {
        if (response.status === 200) {
          setMedicines(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          generateRefreshToken(error);
        } else {
          console.error("Error fetching medicines:", error);
        }
      });
  };

  const updateStock = async (id, newStock) => {
    try {
      const response = await axiosInstance.patch(
        `${apiUrl}/medical_store_app/medicine/${id}/`,
        { stock_quantity: newStock }
      );
      if (response.status === 200) {
        alert("Stock quantity updated successfully!");
        setMedicines((prevMedicines) =>
          prevMedicines.map((medicine) =>
            medicine.id === id
              ? { ...medicine, stock_quantity: newStock }
              : medicine
          )
        );
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const deleteMedicine = async (id) => {
    await axiosInstance
      .delete(apiUrl + `/medical_store_app/medicines/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          alert("Medicine deleted successfully!");
          setMedicines((prevMedicines) =>
            prevMedicines.filter((medicine) => medicine.id !== id)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting medicine:", error);
      });
  };

  useEffect(() => {
    getMedicines();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>View Medicines</h2>
      {loading ? (
        <p>Loading medicines...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "12px", backgroundColor: "#2a2a2a", color: "white", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Medicine Name
              </th>
              <th style={{ padding: "12px", backgroundColor: "#2a2a2a", color: "white", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Category
              </th>
              <th style={{ padding: "12px", backgroundColor: "#2a2a2a", color: "white", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Price
              </th>
              <th style={{ padding: "12px", backgroundColor: "#2a2a2a", color: "white", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Description
              </th>
              <th style={{ padding: "12px", backgroundColor: "#2a2a2a", color: "white", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Stock Quantity
              </th>
              <th style={{ padding: "12px", backgroundColor: "#2a2a2a", color: "white", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No medicines available</td>
              </tr>
            ) : (
              medicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    {medicine.name}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    {medicine.category_details.category_name}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    {medicine.price}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    {medicine.description}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    <input
                      type="number"
                      value={medicine.stock_quantity}
                      onChange={(e) =>
                        setMedicines((prevMedicines) =>
                          prevMedicines.map((m) =>
                            m.id === medicine.id
                              ? {
                                  ...m,
                                  stock_quantity: e.target.value,
                                }
                              : m
                          )
                        )
                      }
                    />
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    <button
                      style={{
                        padding: "7px 14px",
                        backgroundColor: "#ff9800",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => deleteMedicine(medicine.id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{
                        padding: "7px 14px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() =>
                        updateStock(
                          medicine.id,
                          parseInt(medicine.stock_quantity)
                        )
                      }
                    >
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
