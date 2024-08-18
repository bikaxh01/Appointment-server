import { Request, Response } from "express";
import { user } from "../models/userModel.interface";

const registerUserController = async (req: Request, res: Response) => {
  const userData: user = req.body;
  try {
   console.log(req.body);
   
  } catch (error) {}

  res.json({
    success: false,
    message: "User registered successfully",
    data: userData,
  });
};

export { registerUserController };
