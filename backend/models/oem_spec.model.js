const mongoose = require("mongoose");

const oemSchema = mongoose.Schema(
  {
    name_of_model: String,
    year_of_model: Number,
    list_price: Number,
    avail_colors: [String],
    mileage_manu: Number,
    power: Number,
    max_speed: Number,
  },
  {
    versionKey: false,
  }
);

const OemModel = mongoose.model("oem_spec", oemSchema);

module.exports = {
  OemModel,
};
