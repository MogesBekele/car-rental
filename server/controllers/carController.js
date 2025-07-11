import Car from "../models/carModel";

export const getCarDetials = async (req, res) => {
  try {
    const cars = await Car.find({});
    if (!cars) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCarById = async (req, res) => {
  const id = req.params;
  try {
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    return res.status(200).json({ success: true, car });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
