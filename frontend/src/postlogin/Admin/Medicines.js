import React, { useEffect, useState } from "react";
import AddEditMedicine from "../pages/AddEditMedicine.js";
import ListMedicines from "../pages/listMedicine.js";
import { apiUrl, axiosInstance, generateRefreshToken } from "../../axios.js";

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axiosInstance.get(apiUrl + "/medical_store_app/medicine/");
      if (response.status === 200) {
        setMedicines(response.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        generateRefreshToken(error);
      } else {
        console.error("Error fetching medicines:", error);
      }
    }
  };

  const handleAddMedicine = (newMedicine) => {
    setMedicines((prevMedicines) => [...prevMedicines, newMedicine]);
  };

  return (
    <div>
      <div className="container m-5">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="medicines-tab"
              data-bs-toggle="tab"
              data-bs-target="#medicines"
              type="button"
              role="tab"
              aria-controls="medicines"
              aria-selected="true"
            >
              Medicines
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="addmedicine-tab"
              data-bs-toggle="tab"
              data-bs-target="#addmedicine"
              type="button"
              role="tab"
              aria-controls="addmedicine"
              aria-selected="false"
            >
              Add Medicine
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="medicines"
            role="tabpanel"
            aria-labelledby="medicines-tab"
          >
            <ListMedicines medicines={medicines} />
          </div>
          <div
            className="tab-pane fade"
            id="addmedicine"
            role="tabpanel"
            aria-labelledby="addmedicine-tab"
          >
            <AddEditMedicine onAddMedicine={handleAddMedicine} />
          </div>
        </div>
      </div>
    </div>
  );
}
