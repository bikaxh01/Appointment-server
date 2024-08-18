"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRegisterRequest = void 0;
const express_validator_1 = require("express-validator");
exports.validateUserRegisterRequest = [
    (0, express_validator_1.check)("fullName").notEmpty().withMessage("Full name is required"),
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email address is required")
        .isEmail()
        .withMessage("Inavlid email Address"),
    (0, express_validator_1.check)("gender").notEmpty().withMessage("gender is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.check)("phone")
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
