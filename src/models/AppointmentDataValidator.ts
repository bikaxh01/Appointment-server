import { check } from "express-validator";

export const validateAppointmentDataRequest = [
  check("patientID").notEmpty().withMessage("Patient ID  is required"),
  check("reason").notEmpty().withMessage("Reason is required"),
  check("doctorId").notEmpty().withMessage("Doctor ID is required"),
];
