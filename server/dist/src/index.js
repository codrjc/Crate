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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const albumModel_1 = __importDefault(require("../models/albumModel"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const uri = process.env.MONGODB_URI || "";
app.get("/api/user", (req, res) => {
    console.log(req);
    res.json({
        users: ["userOne", "lets see it baby"],
    });
});
app.get("/albums", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const albums = yield albumModel_1.default.find({});
        res.status(200).json(albums);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
app.get("/album/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const album = yield albumModel_1.default.findById(id);
        res.status(200).json(album);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
app.post("/album", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const album = yield albumModel_1.default.create(req.body);
        res.status(200).json(album);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error caught" + error });
    }
}));
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
