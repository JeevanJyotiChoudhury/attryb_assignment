const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { CarModel } = require("../models/car.model");

const carRouter = express.Router();

carRouter.use(auth);

//add secone hand cars with specification
carRouter.post("/addcar", async (req, res) => {
  try {
    const carDetails = req.body;
    const newCar = new CarModel(carDetails);
    await newCar.save();
    res.status(200).json({ message: "A new car has been added." });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
});

//get all the cars
carRouter.get("/", async (req, res) => {
  try {
    const getAllCars = await CarModel.find();
    res.status(200).json(getAllCars);
  } catch (err) {
    res.status(400).json({ Error: "Failed to get the cars" });
  }
});

//edit car spec
carRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedDetails = req.body;
  CarModel.findByIdAndUpdate(id, updatedDetails, { new: true })
    .then((updatedCar) => {
      if (!updatedCar) {
        return res.status(404).json({ mesage: "Car not found" });
      }
      res.status(200).json({ message: "Car details has been updated" });
    })
    .catch((err) => {
      res.status(400).json({ Error: err.message });
    });
});

//delete a car
carRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  CarModel.findByIdAndDelete(id)
    .then((data) => res.status(200).json({ message: "Car has been deleted" }))
    .catch((err) => {
      res.status(400).json({ Error: err.message });
    });
});

module.exports = {
    carRouter
}