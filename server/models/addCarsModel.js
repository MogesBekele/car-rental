import mongoose from "mongoose";

const addCarsSchema = new mongoose.Schema({
  brand: { type: String, require: true },
  model: { type: String, require: true },
  image: { type: String, require: true },
  year: { type: Number, require: true },
  category: { type: String, require: true },
  seating_capacity: { type: Number, require: true },
  fuel_type: { type: String, require: true },
  transmission: { type: String, require: true },
  pricePerDay: { type: Number, require: true },
  location: { type: String, require: true },
  description: { type: String, require: true },
  isAvailable: { type: Boolean, require: true },
});

const addCarsModel = mongoose.model("addCars", addCarsSchema);

export default addCarsModel;
