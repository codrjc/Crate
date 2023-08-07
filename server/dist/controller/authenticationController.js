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
exports.AuthenticationController = void 0;
const authentificationService_1 = require("../service/authentificationService");
const spotifyApiController_1 = require("./spotifyApiController");
class AuthenticationController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authUrl = authentificationService_1.AuthenticationService.getAuthorizationUrl();
                res.redirect(authUrl);
            }
            catch (error) {
                console.error("Login Error:", error);
                res.status(500).send(`Login Error: ${error}`);
            }
        });
    }
    static callback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = req.query.code;
                if (typeof code !== "string") {
                    throw new Error("Callback code is missing or not a string.");
                }
                const tokens = yield authentificationService_1.AuthenticationService.handleCallback(code);
                (0, spotifyApiController_1.updateStoredTokens)(tokens);
                console.log("updated stored tokens");
                res.send("Success! You can now close the window.");
            }
            catch (error) {
                console.error("Callback Error:", error);
                res.status(500).send(`Callback Error: ${error}`);
            }
        });
    }
}
exports.AuthenticationController = AuthenticationController;
