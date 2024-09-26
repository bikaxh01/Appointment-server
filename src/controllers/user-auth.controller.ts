import { Request, response, Response } from "express";
import { AppointmentModel, userModel } from "../models/userModel.interface";
import { prisma_client } from "../config/prismaClient";
import { customAlphabet } from "nanoid";
import { sendResponse } from "../utils/response";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/resend";
import { Gender } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/EnvConfigs";
const bcryptSalt = 10;
//Register user
const registerUserController = async (req: Request, res: Response) => {
  try {
    const userData: userModel = req.body;
   
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

    const user = await prisma_client.user.create({
      data: { ...userData, gender: userData.gender as Gender },
      select: {
        email: true,
        fullName: true,
        gender: true,
        phone: true,
        isVerified: true,
      },
    });

    if (user) {
      await sendEmail(user.email, Number(verificationCode), user.fullName);
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

//User-SignIn

const userSignInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  

  try {
    const getUser = await prisma_client.user.findUnique({
      where: {
        email,
      },
    });

 
    if (!getUser) {
      return sendResponse(res, false, "User not found", [], 404);
    }

    const matchPW = await bcrypt.compare(password, getUser.password);

    if (!matchPW) {
      return sendResponse(res, false, "Incorrect password", [], 400);
    }
      
    sendResponse(res, true, "Logged In successful", getUser, 200);
  } catch (error) {
    sendResponse(res, false, "Internal Server Error", [], 500);
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
const verifyUserController = async (req: Request, res: Response) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return sendResponse(res, false, "Invalid Inputs", [], 400);
    }

    const getUser = await prisma_client.user.findUnique({
      where: {
        email,
      },
    });

    if (!getUser) {
      return sendResponse(res, false, "user doesn't exists", [], 404);
    }

    if (getUser.isVerified) {
      return sendResponse(res, false, "User is already verified", [], 200);
    }

    const matchVerificationCode: boolean =
      getUser.verificationCode === Number(verificationCode)
    if (!matchVerificationCode) {
      return sendResponse(res, false, "Incorrect Verification Code", [], 400);
    }

    const updateUser = await prisma_client.user.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
        verificationCode: 0,
      },
      select: {
        email: true,
        fullName: true,
        gender: true,
        phone: true,
        isVerified: true,
      },
    });

    return sendResponse(
      res,
      true,
      "User verified successfully",
      updateUser,
      200
    );
  } catch (error) {
    return sendResponse(
      res,
      false,
      "Error occurred while verifying user ",
      [],
      500
    );
  }
};

const createAppointmentController = async (req: Request, res: Response) => {
  const appointmentData: AppointmentModel = req.body;

  try {
    if (!appointmentData.patientID) {
      return sendResponse(res, false, "Invalid user...", [], 400);
    }
    if (!appointmentData.doctorId) {
      return sendResponse(res, false, "Invalid Doctor...", [], 400);
    }

    const checkUser = await prisma_client.user.findUnique({
      where: {
        id: appointmentData.patientID,
      },
    });
    const checkDoctor = await prisma_client.doctor.findUnique({
      where: {
        id: appointmentData.doctorId,
      },
    });

    if (!checkUser) {
      return sendResponse(res, false, "User doesn't exists...", [], 404);
    }
    if (!checkDoctor) {
      return sendResponse(res, false, "Doctor doesn't exists...", [], 404);
    }

    const createAppointment = await prisma_client.appointment.create({
      data: { ...appointmentData },
      select: {
        id: true,
        status: true,
      },
    });

    sendResponse(
      res,
      true,
      "Appointment Registered Successfully",
      createAppointment,
      200
    );
  } catch (error) {
    console.log(error);

    sendResponse(res, false, "Internal Server Error", [], 500);
  }
};

const getAllAppointmentByUserController = async (req:Request,res:Response)=>{
   const {userId} = req.query

   try {
    
    if(!userId || typeof userId !== "string"){
      return sendResponse(res,false,"Invalid user Id",[],400)
    }

    const getAppointments  = await prisma_client.appointment.findMany({
      where:{
        patientID:userId
      }
    })

    sendResponse(res,true,"Successfully Fetched",getAppointments,200)

   } catch (error) {
    console.log("🚀 ~ getAllAppointmentByUser ~ error:", error)
    
    sendResponse(res, false, "Internal Server Error", [], 500);
   }
}

const validateEmailController = async (req:Request,res:Response)=>{

  const {email} = req.query

  try {
    if(!email || typeof email !== "string"){
      return sendResponse(res,false,"Invalid  Email",[],400)
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     const validateEmailFormat = emailRegex.test(email)

     if(!validateEmailFormat){
      return sendResponse(res,false,"Invalid Email format",[],400)
     }

     const checkEmail = await prisma_client.user.findUnique({
      where:{
        email
      }
     })

     if(checkEmail){
      return sendResponse(res,false,"Email format already registered",[],400)
     }
     sendResponse(res,false,"Looks Great 😲",[],200)
     
    } catch (error:any) {
      console.log("🚀 ~ validateEmail ~ error:", error.message)
      
    sendResponse(res,false,"Error occured while validating Email ",[],400)
    
  }

}


export {
  createAppointmentController,
  registerUserController,
  uploadDocumentController,
  verifyUserController,
  userSignInController,
  validateEmailController,
  getAllAppointmentByUserController,
};
