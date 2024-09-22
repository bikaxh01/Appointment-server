import { prisma_client } from "../config/prismaClient";
import { Doctor } from "../models/userModel.interface";
import { sendResponse } from "../utils/response";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Gender } from "@prisma/client";
const bcryptSalt = 10;
const allDoctors = async (req: Request, res: Response) => {
  try {
    const doctor = await prisma_client.doctor.findMany();

    sendResponse(res, true, "SucessFully Fetch ", allDoctors, 200);
  } catch (error) {
    console.log(" allDoctors ~ error: ", error);
    sendResponse(res, false, "Internal Server Error", [], 500);
  }
};

const createDoctor = async (req: Request, res: Response) => {
  try {
    const doctorData: Doctor = req.body;

    if (!doctorData.email) {
      return sendResponse(res, false, "Invalid email", [], 400);
    }

    const isDoctorExists = await prisma_client.doctor.findUnique({
      where: {
        email: doctorData.email,
      },
    });

    if (isDoctorExists) {
      return sendResponse(res, false, "Email already Registered", [], 400);
    }

    const hashedPassword = await bcrypt.hash(doctorData.password, bcryptSalt);
    doctorData.password = hashedPassword;

    const newDoctor = await prisma_client.doctor.create({
      data: { ...doctorData, gender: doctorData.gender as Gender },
      select: {
        fullName: true,
        email: true,
        specialization: true,
        gender: true,
        about: true,
      },
    });

    sendResponse(res, true, "Doctors created successfully", newDoctor, 200);
  } catch (error: any) {
    console.log(error);
    sendResponse(
      res,
      false,
      "Error occurred while creating doctor",
      error.message,
      500
    );
    
  }
};

export { allDoctors,
  createDoctor

 };
