import { Request, Response } from "express";
import { Review } from "../models/reviewModel";

export class ReviewController {
  static async create(req: Request, res: Response) {
    try {
      const { albumId, review, userId } = req.body;

      if (!albumId || !review || !userId) {
        return res
          .status(400)
          .json({ message: "Both albumId, userId & review are required" });
      }

      const newReview = new Review({
        albumId,
        review,
        userId,
      });

      console.log(newReview);

      const savedReview = await newReview.save(); // Save the review to the database

      res.status(201).json({
        message: "Review created successfully",
        review: savedReview,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
