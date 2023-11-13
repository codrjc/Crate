import mongoose, { Schema } from "mongoose";
import { IUser } from "./userModel";

export interface IReview extends Document {
  review: string;
  albumId: string;
  userId: IUser | mongoose.Types.ObjectId;
  imageUrl: string;
}

const reviewSchema: Schema<IReview> = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please enter review"],
    },
    albumId: {
      type: String,
      required: [true, "Please enter albumId"],
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<IReview>("Review", reviewSchema);
