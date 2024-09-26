import { Router } from "express";

import { allDoctors, createDoctor, getDoctorOfSpecializationController, getSpecializationController } from "../controllers/doctors.controller";

const doctorRoute = Router()


doctorRoute.get("/", (req,res) => {
    res.json({message: "Doctors route is working!"})
});

doctorRoute.get("/all-doctors", allDoctors)
doctorRoute.get("/specialization", getSpecializationController)
doctorRoute.get("/get-specialist-doctors", getDoctorOfSpecializationController)
doctorRoute.post("/create-doctor",createDoctor)

export{
    doctorRoute,
}