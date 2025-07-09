const { Schema, model, Types } = mongoose;

const carSchema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: "User" },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvaliable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Car = model("Car", carSchema);

export default Car;
