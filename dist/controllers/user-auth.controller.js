"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = void 0;
const nanoid_1 = require("nanoid");
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const generateOTP = (0, nanoid_1.customAlphabet)("123456789", 6);
    const otp = generateOTP();
    try {
        //  prisma_client.admin.create({
        //   data:{
        //     email:"sdjn"
        //   }
        //  })
    }
    catch (error) { }
    res.json({
        success: false,
        message: "User registered successfully",
        data: otp
    });
});
exports.registerUserController = registerUserController;
