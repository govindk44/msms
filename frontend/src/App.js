import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./prelogin/Login.js";
import Register from "./prelogin/Register.js";
import PreLoginLayout from "./prelogin/PreLoginLayout";
import PostLoginLayout from "./postlogin/PostLoginLayout.js";
import Home from "./prelogin/Home.js";
import ListMedicines from "./postlogin/Admin/ListMedicine.js";
import AddEditMedicine from "./postlogin/Admin/AddEditMedicine.js";
import MedicineBookings from "./postlogin/Admin/MedicineBookings.js";
import AllUsers from "./postlogin/Admin/AllUsers.js";
import Cart from "./postlogin/Admin/cart.js";
import UserProductViews from "./postlogin/User/userproductviews.js";
import ChangePassword from "./postlogin/User/Changepassword.js"
import Booking from "./postlogin/User/Booking.js";
import Checkout from "./postlogin/User/checkout.js";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PreLoginLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<PostLoginLayout />}>
            <Route path="/MedicineBookings" element={<MedicineBookings />} />
            <Route path="/ListMedicine" element={<ListMedicines />} />
            <Route path="/ad/AddEditMedicine" element={<AddEditMedicine />} />
            <Route path="/admin/User" element={<AllUsers />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/UserProductViews" element={<UserProductViews />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/Booking" element={<Booking/>}/>
            <Route path="/checkout" element={<Checkout/>}/>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
