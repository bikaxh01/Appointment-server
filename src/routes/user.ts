import { Router } from "express";
import { registerUser } from "../controllers/user-auth";

export const userRoute = Router();



userRoute.get("/", (req, res) => {
  res.json({ message: "user Route are working" });
});

userRoute.get('/auth/register-user',registerUser)
