import React, { useEffect, useState } from "react";
import { apiUrl, axiosInstance, generateRefreshToken } from "../../axios";


export default function AddEditMedicine({ onAddMedicine }) {
  const user_id = sessionStorage.getItem("user_id");
  const [formValues, setFormValues] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
  });

  const [medicineCategories, setMedicineCategories] = useState([]);

  useEffect(() => {
    getMedicineCategories();
  }, []);

  const getMedicineCategories = async () => {
    await axiosInstance
      .get(apiUrl + "/medical_store_app/medicine/categories/")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setMedicineCategories(response.data); 
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          generateRefreshToken(error);
        } else {
          console.error("Error fetching categories:", error); 
        }
      });
  };

  const onChangeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    addMedicine();
  };

  const addMedicine = async () => {
    const medicineData = { ...formValues, user: user_id };
    console.log("Submitting Medicine Data:", medicineData);
    try {
      const response = await axiosInstance.post(apiUrl + "/medical_store_app/medicine/add/", medicineData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Medicine added successfully!");
        onAddMedicine(response.data); 
        setFormValues({
          category: "",
          name: "",
          description: "",
          price: "",
          stock_quantity: "",
        });
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };
  return (
    <div style={{ margin: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add Medicines</h1>
      <form onSubmit={submit} method="post">
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="medicine_category" style={{ display: "block", marginBottom: "5px" }}>
            Medicine Category *
          </label>
          <select
            name="category"
            id="category"
            value={formValues.category}
            onChange={onChangeHandler}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select</option>
            {medicineCategories.length > 0 ? (
              medicineCategories.map((category, i) => (
                <option value={category.id} key={i}>
                  {category.category_name}
                </option>
              ))
            ) : (
              <option value="">No categories available</option>
            )}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
            Medicine Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            onChange={onChangeHandler}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description" style={{ display: "block", marginBottom: "5px" }}>
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formValues.description}
            onChange={onChangeHandler}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="price" style={{ display: "block", marginBottom: "5px" }}>
            Price *
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formValues.price}
            onChange={onChangeHandler}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="stock" style={{ display: "block", marginBottom: "5px" }}>
            Stock Quantity *
          </label>
          <input
            type="number"
            name="stock_quantity"
            id="stock_quantity"
            value={formValues.stock_quantity}
            onChange={onChangeHandler}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff9800",
              color: "white",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
}
