import { Router } from "express";
import { createAppointmentController, getAllAppointmentByUserController, registerUserController,uploadDocumentController,userSignInController,validateEmailController,verifyUserController } from "../controllers/user-auth.controller";
import {validateUserRegisterRequest } from '../models/userDataValidation'
import { isRequestValidated } from "../models/user-requestVlidator";
import upload from "../utils/multer";
import { uploadDocumentToS3 } from "../utils/docUploader.S3";
import { validateAppointmentDataRequest } from "../models/AppointmentDataValidator";
import { getAvailableTimeSlotsController } from "../controllers/appointment";

const userRoute = Router();


userRoute.get("/", (req, res) => {
  res.json({ message: "user Route are working" });
});

userRoute.post('/auth/register-user',validateUserRegisterRequest,isRequestValidated,registerUserController)
userRoute.post('/auth/signIn',validateUserRegisterRequest,isRequestValidated,userSignInController)
userRoute.post('/auth/verify-user',verifyUserController)
userRoute.post('/create-appointment',validateAppointmentDataRequest,isRequestValidated,createAppointmentController)
userRoute.post('/upload-document',upload.single('file'),uploadDocumentToS3,uploadDocumentController)
userRoute.post('/getAppointmentTime',getAvailableTimeSlotsController)
userRoute.get('/get-appointments',getAllAppointmentByUserController)
userRoute.get('/validate-email',validateEmailController)
export {
  userRoute
}