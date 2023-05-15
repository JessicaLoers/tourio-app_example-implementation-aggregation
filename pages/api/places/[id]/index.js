import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews",
        },
      },

      // WFT???
      {
        $lookup: {
          from: "users",
          localField: "$reviews.user",
          foreignField: "_id",
          as: "reviews.user",
        },
      },
      { $unwind: "$reviews.user" },
    ]);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  } else if (request.method === "PATCH") {
    const placeToUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json(placeToUpdate);
  } else if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);
    response.status(200).json(placeToDelete);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
