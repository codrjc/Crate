"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv").config(); // Load dotenv configuration
const getme_1 = require("./getme");
const authentification_1 = __importDefault(require("./routes/authentification"));
const api_1 = __importDefault(require("./routes/api"));
const db_1 = require("./database/db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// Use authentication routes
app.use("/", authentification_1.default);
app.use("/api", api_1.default);
app.get("/getMe", () => {
    (0, getme_1.getMyData)();
});
(0, db_1.connectToDatabase)().then(() => {
    app.listen(5000, () => {
        console.log("Server started on port 5000");
    });
});
