import User from "../models/userModel.js";
import Car from "../models/carModel.js";
import fs from "fs";
import imagekit from "../config/imageKit.js";

export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

// api to list cars
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is missing" });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // optimization through imagekit URL trasformation
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/endpoint/",
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageUrl;

    await Car.create({
      ...car,
      owner: _id,
      image,
    });
    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const getOwnerCars = async (req, res)=>{
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}