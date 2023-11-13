import express from "express";
import { AlbumController } from "../controller/albumController";
import { HealthController } from "../controller/healthController";
import { AuthenticationController } from "../controller/authenticationController";
import { ReviewController } from "../controller/reviewController";
const router = express.Router();

router.get("/health", HealthController.healthCheck);

router.get("/login", AuthenticationController.login);
router.get("/callback", AuthenticationController.callback);

// router.get("/albums/:id?", AlbumController.getAlbums);
router.post("/review", ReviewController.create);
router.get("/review/all", ReviewController.getAll);

export default router;

// POST album
// router.post("/album", async (req, res) => {
//   try {
//     const album = await Album.create(req.body);
//     res.status(200).json(album);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error caught" + error });
//   }
// });
