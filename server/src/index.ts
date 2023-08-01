import express, { Express, Request, Response } from "express";
import mongose from "mongoose";
require("dotenv").config();
import Album from "../models/albumModel";
const app = express();

app.use(express.json());

const uri: string = process.env.MONGODB_URI || "";

app.get("/api/user", (req, res) => {
  console.log(req);
  res.json({
    users: ["userOne", "lets see it baby"],
  });
});

app.get("/albums", async (req, res) => {
  try {
    const albums = await Album.find({});
    res.status(200).json(albums);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/album/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);
    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/album", async (req: Request, res: Response) => {
  try {
    const album = await Album.create(req.body);
    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error caught" + error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
