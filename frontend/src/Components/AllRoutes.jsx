import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Carform from "./Carform";
import Cardetails from "../Pages/Cardetails";

const AllRoutes = () => {
  const [cars, setCars] = useState([]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/carform"
          element={<Carform cars={cars} setCars={setCars} />}
        />
        <Route
          path="/allcars"
          element={<Cardetails cars={cars} setCars={setCars} />}
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
