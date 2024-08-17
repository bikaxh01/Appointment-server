import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
  res.json({
    success: false,
    message: "User registered successfully",
  });
};

export  {
  registerUser,
};
