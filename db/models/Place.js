import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: String,
  location: String,
  image: String,
  mapURL: String,
  description: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
