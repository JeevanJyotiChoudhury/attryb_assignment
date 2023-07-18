import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Carform from "./Carform";
import Cardetails from "../Pages/Cardetails";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carform" element={<Carform />} />
        <Route path="/allcars" element={<Cardetails />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
