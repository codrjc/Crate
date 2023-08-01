"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const albumSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please enter album title "],
    },
    review: {
        type: String,
        required: [true, "Please enter an album review"],
    },
}, {
    timestamps: true,
});
const Album = mongoose_1.default.model("Album", albumSchema);
exports.default = Album;
