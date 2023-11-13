"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const healthController_1 = require("../controller/healthController");
const authenticationController_1 = require("../controller/authenticationController");
const reviewController_1 = require("../controller/reviewController");
const router = express_1.default.Router();
router.get("/health", healthController_1.HealthController.healthCheck);
router.get("/login", authenticationController_1.AuthenticationController.login);
router.get("/callback", authenticationController_1.AuthenticationController.callback);
// router.get("/albums/:id?", AlbumController.getAlbums);
router.post("/review", reviewController_1.ReviewController.create);
router.get("/review/all", reviewController_1.ReviewController.getAll);
exports.default = router;
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
