import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema, "reviews");

export default Review;
