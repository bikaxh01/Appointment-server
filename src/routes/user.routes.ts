import { Router } from "express";
import { registerUserController } from "../controllers/user-auth.controller";
import {validateUserRegisterRequest } from '../models/userDataValidation'
import { isRequestValidated } from "../models/user-requestVlidator";
import upload from "../utils/multer";
import { uploadDocumentToS3 } from "../utils/docUploader.S3";

export const userRoute = Router();



userRoute.get("/", (req, res) => {
  res.json({ message: "user Route are working" });
});

userRoute.post('/auth/register-user',upload.single('document'),uploadDocumentToS3,registerUserController)
