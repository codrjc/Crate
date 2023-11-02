import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  displayName: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter review"],
    },
    displayName: {
      type: String,
      required: [true, "Please enter albumId"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
