import express from "express";
import Album from "../models/albumModel"; // Import your album model

const router = express.Router();

// GET albums
router.get("/albums", async (req, res) => {
  try {
    const albums = await Album.find({});
    res.status(200).json(albums);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET album by ID
router.get("/album/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);
    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// POST album
router.post("/album", async (req, res) => {
  try {
    const album = await Album.create(req.body);
    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error caught" + error });
  }
});

export default router;
