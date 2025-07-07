
import mongoose from "mongoose";

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`Connected: database connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB