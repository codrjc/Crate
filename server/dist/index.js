"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config(); // Load dotenv configuration
const getme_1 = require("./getme");
const spotifyApiRoutes_1 = __importDefault(require("./routes/spotifyApiRoutes"));
const db_1 = require("./database/db");
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
// app.use("/", apiRoutes)
app.use("/", routes_1.default);
app.use("/spotify", spotifyApiRoutes_1.default);
app.get("/getMe", () => {
    (0, getme_1.getMyData)();
});
(0, db_1.connectToDatabase)().then(() => {
    app.listen(5000, () => {
        console.log("Server started on port 5000");
    });
});
