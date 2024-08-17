import { check } from "express-validator";

export const validateUserRegisterRequest = [
  check("fullName").notEmpty().withMessage("Full name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Inavlid email Address"),
  check("gender").notEmpty().withMessage("gender is required"),
  check("password").notEmpty().withMessage("Password is required"),
  check("phone")
    .custom((value, { req }) => {
      if (!value || value.trim() === "") {
        throw new Error("Phone number is required");
      }
      return true;
    })
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Invalid phone number"),
];
