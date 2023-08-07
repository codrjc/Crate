import { Request, Response } from "express";

export class HealthController {
  static async healthCheck(req: Request, res: Response) {
    try {
      res.status(200).send("Service is healthy"); // Send a response message
    } catch (error) {
      console.error("Health Check Error:", error);
      res.status(500).send(`Health Check Error: ${error}`);
    }
  }
}
