import { Router } from "express";
import { registerUserController } from "../controllers/user-auth.controller";
import {validateUserRegisterRequest } from '../models/userDataValidation'
import { isRequestValidated } from "../models/user-requestVlidator";
import upload from "../utils/multer";

export const userRoute = Router();



userRoute.get("/", (req, res) => {
  res.json({ message: "user Route are working" });
});

userRoute.post('/auth/register-user',upload.single('document'),registerUserController)
