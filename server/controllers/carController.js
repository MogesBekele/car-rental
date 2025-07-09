// controllers/carController.js
import Car from "../models/carModel.js";

export const addCar = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const {
    brand,
    model,
    year,
    category,
    seating_capacity,
    fuel_type,
    transmission,
    pricePerDay,
    location,
    description,
  } = req.body;

  const image = image_filename;

  try {
    const car = new Car({
      brand,
      model,
      image,
      year,
      category,
      seating_capacity,
      fuel_type,
      transmission,
      pricePerDay,
      location,
      description,
    });

    await car.save();
    res.status(201).json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.error("Error adding car:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
