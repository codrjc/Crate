import mongoose, { Schema, Document, Model } from "mongoose";

interface IAlbum extends Document {
  title: string;
  review: string;
}

const albumSchema: Schema<IAlbum> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter album title "],
    },
    review: {
      type: String,
      required: [true, "Please enter an album review"],
    },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
