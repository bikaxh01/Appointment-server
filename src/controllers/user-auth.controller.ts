import { Request, Response } from "express";
import { user } from "../models/userModel.interface";
import { prisma_client } from "../config/prismaClient";
import { customAlphabet } from "nanoid";
import { sendResponse } from "../utils/response";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/resend";
const bcryptSalt = 10;
//Register user
const registerUserController = async (req: Request, res: Response) => {
  try {
    const userData: user = req.body;

    if (!userData.email) {
      return sendResponse(res, false, "Invalid email", [], 400);
    }

    const generateOTP = customAlphabet("0123456789", 6);
    const verificationCode = generateOTP();

    const isUserExists = await prisma_client.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (isUserExists) {
      return sendResponse(res, false, "Email already Registered", [], 400);
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(userData.password, bcryptSalt);
    userData.password = hashedPassword;
    userData.verificationCode = Number(verificationCode);

    const user = await prisma_client.user.create({ data: { ...userData },select:{
      email:true,
      fullName:true,
      gender:true,
      phone:true,
      isVerified:true
    } });

    if(user){
      await sendEmail(user.email,Number(verificationCode),user.fullName)
    }
    sendResponse(res, true, "user registered successfully", user, 200);
  } catch (error: any) {
    console.log(error);
    sendResponse(
      res,
      false,
      "Error occurred while creating user",
      error.message,
      500
    );
  }
};

// Document Uploader
const uploadDocumentController = async (req: Request, res: Response) => {
  const data = {
    documentUrl: req.body.documentUrl,
  };
  sendResponse(res, true, "Document uploaded Successfully", data, 200);
};


//Verify user
const verifyUserController = async (req:Request,res:Response)=>{
try {
  const {email,verificationCode} = req.body;

  if(!email || !verificationCode){
    return sendResponse(res,false,"Invalid Inputs",[],400)
  }

  const getUser = await prisma_client.user.findUnique({
    where:{
      email
    }
  })

  if(!getUser){
    return sendResponse(res,false,"user doesn't exists",[],404)
  }

  const matchVerificationCode:boolean = getUser.verificationCode === verificationCode
  if(!matchVerificationCode){
    return sendResponse(res,false,"Incorrect Verification Code",[],400)
}

const updateUser = await prisma_client.user.update({
  where:{
    email
  },
  data:{
    isVerified:true
  },
  select:{
    email:true,
    fullName:true,
    gender:true,
    phone:true,
    isVerified:true
  }
})

return sendResponse(res,true,"User verified successfully",updateUser,200)


} catch (error) {
   return sendResponse(res,false,"Error occurred while verifying user ",[],500)
  
}
}

export { registerUserController, uploadDocumentController,verifyUserController };
