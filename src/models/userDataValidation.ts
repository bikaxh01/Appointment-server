import { check } from "express-validator";

export const validateUserRegisterRequest = [
  check("fullName").notEmpty().withMessage("Full name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("invalid email Address"),
  check("gender").notEmpty().withMessage("gender is required"),
  check("phone").notEmpty().withMessage("Phone is required"),
  check("password").notEmpty().withMessage("Password is required"),
];
