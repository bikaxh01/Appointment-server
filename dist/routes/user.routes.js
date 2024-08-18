"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_auth_controller_1 = require("../controllers/user-auth.controller");
const multer_1 = __importDefault(require("../utils/multer"));
const docUploader_S3_1 = require("../utils/docUploader.S3");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.get("/", (req, res) => {
    res.json({ message: "user Route are working" });
});
exports.userRoute.post('/auth/register-user', multer_1.default.single('document'), docUploader_S3_1.uploadDocumentToS3, user_auth_controller_1.registerUserController);
