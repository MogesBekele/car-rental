import User from "../models/userModel.js"
import Car from "../models/carModel.js";

export const changeRoleToOwner = async (req, res)=>{
try {
  const {_id} = req.user
  await User.findByIdAndUpdate(_id, {role: 'owner'})
  res.json({success:true, message: 'now you can list cars'})
} catch (error) {
  console.log(error.message)
  res.json({success:true, message: error.message})
}
}


// api to list cars
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
