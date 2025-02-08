import React from "react";
// import NavBar from "../prelogin/NavBar";
import { Outlet } from "react-router-dom";
import Header from "../components/Headers/Header";
export default function PreLoginLayout() {
  return (
    <div>
      {/* <NavBar /> */}
      <Header />
      <Outlet />
    </div>
  );
}
