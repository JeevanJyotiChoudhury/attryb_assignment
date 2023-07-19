const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    price: Number,
    color: String,
    mileage: Number,
  },
  {
    versionKey: false,
  }
);

const CarModel = mongoose.model("cars", carSchema);

module.exports = {
  CarModel,
};
