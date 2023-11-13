"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const reviewModel_1 = require("../models/reviewModel");
class ReviewController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { albumId, review, userId, imageUrl } = req.body;
                if (!albumId || !review || !userId || !imageUrl) {
                    return res
                        .status(400)
                        .json({ message: "Both albumId, userId & review are required" });
                }
                const newReview = new reviewModel_1.Review({
                    albumId,
                    review,
                    userId,
                    imageUrl,
                });
                console.log(newReview);
                const savedReview = yield newReview.save(); // Save the review to the database
                res.status(201).json({
                    message: "Review created successfully",
                    review: savedReview,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield reviewModel_1.Review.find(); // Find all reviews in the database
                res.status(200).json({ reviews });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}
exports.ReviewController = ReviewController;
