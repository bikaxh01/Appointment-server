import { Response } from "express";
export const sendResponse = (res:Response, success:boolean, message:string, data:any, statusCode:number) => {
    return res.status(statusCode).json({
      success,
      message,
      data,
    });
  };
  