"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const env = process.env;
exports.db = {
    uri: env.MONOGODB_URI,
};
