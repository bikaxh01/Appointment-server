import { Router } from "express";
import { registerUserController,uploadDocumentController,verifyUserController } from "../controllers/user-auth.controller";
import {validateUserRegisterRequest } from '../models/userDataValidation'
import { isRequestValidated } from "../models/user-requestVlidator";
import upload from "../utils/multer";
import { uploadDocumentToS3 } from "../utils/docUploader.S3";

 const userRoute = Router();



userRoute.get("/", (req, res) => {
  res.json({ message: "user Route are working" });
});

userRoute.post('/auth/register-user',validateUserRegisterRequest,isRequestValidated,registerUserController)
userRoute.post('/auth/verify-user',verifyUserController)
userRoute.post('/upload-document',upload.single('document'),uploadDocumentToS3,uploadDocumentController)

export {
  userRoute
}