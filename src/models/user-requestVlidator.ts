import { NextFunction,Response,Request } from "express";

import { validationResult } from "express-validator";

export const isRequestValidated = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  };