import { check } from "express-validator";

export const validateUserRegisterRequest = [
  check("email")
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("invalid email Address"),

  check("password").notEmpty().withMessage("Password is required"),
  check("documentNumber").notEmpty().withMessage("Document Number is required"),
];
