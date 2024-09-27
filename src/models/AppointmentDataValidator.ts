import { check } from "express-validator";

export const validateAppointmentDataRequest = [
  check("patientID").notEmpty().withMessage("Patient ID  is required"),
  check("date").notEmpty().withMessage("date is required"),
  check("doctorId").notEmpty().withMessage("Doctor ID is required"),
];
