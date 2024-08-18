import { Request, Response } from "express";
import { user } from "../models/userModel.interface";
import { prisma_client } from "../config/prismaClient";
import {customAlphabet} from 'nanoid'



const registerUserController = async (req: Request, res: Response) => {
  const userData: user = req.body;
  
  const generateOTP= customAlphabet("0123456789",6)
  const otp = generateOTP()

  try {

   


  //  prisma_client.admin.create({
  //   data:{
  //     email:"sdjn"
  //   }
  //  })
   
  } catch (error) {}

  res.json({
    success: false,
    message: "User registered successfully",
    data: otp
  });
};

export { registerUserController };
