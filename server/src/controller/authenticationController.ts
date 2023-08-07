import { Request, Response } from "express";
import { AuthenticationService } from "../service/authentificationService";
import { updateStoredTokens } from "./spotifyApiController";
import { TokenData } from "../types/types";

export class AuthenticationController {
  static async login(req: Request, res: Response) {
    try {
      const authUrl: string = AuthenticationService.getAuthorizationUrl();
      res.redirect(authUrl);
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).send(`Login Error: ${error}`);
    }
  }

  static async callback(req: Request, res: Response) {
    try {
      const code = req.query.code;
      if (typeof code !== "string") {
        throw new Error("Callback code is missing or not a string.");
      }
      const tokens: TokenData = await AuthenticationService.handleCallback(
        code
      );
      updateStoredTokens(tokens);
      console.log("updated stored tokens");
      res.send("Success! You can now close the window.");
    } catch (error) {
      console.error("Callback Error:", error);
      res.status(500).send(`Callback Error: ${error}`);
    }
  }
}
