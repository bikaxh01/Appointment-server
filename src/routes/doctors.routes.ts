import { Router } from "express";
import { userRoute } from "./user.routes";
import { allDoctors, createDoctor } from "../controllers/doctors.controller";

const doctorRoute = Router()


doctorRoute.get("/", (req,res) => {
    res.json({message: "Doctors route is working!"})
});

doctorRoute.get("/all-doctors", allDoctors)

doctorRoute.post("/create-doctor",createDoctor)

export{
    doctorRoute,
}