import { Router } from "express";

export const adminRoute = Router()

adminRoute.get("/", (req, res) => {
    res.json({ message: "Admin Route are working" });
  });

