"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const app = (0, express_1.default)();
const uri = process.env.MONGODB_URI || ""; // Assuming MONGODB_URI is defined in your .env file
app.get("/api/user", (req, res) => {
    console.log(req);
    res.json({
        users: ["userOne", "lets see it baby"],
    });
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
mongoose_1.default
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
