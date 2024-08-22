import { Request, Response } from "express";
import { prisma_client } from "../config/prismaClient";
import { sendResponse } from "../utils/response";

async function getAvailableTimeSlotsController(req:Request,res:Response) {

    const {date} = req.body
   

    if(!date){
        return sendResponse(res,false,"Please enter date",[],400)
    }
    
  // Define the start and end of the day
  const startOfDay = new Date(`${date}T00:00:00Z`);
  const endOfDay = new Date(`${date}T23:59:59Z`);

  // Fetch all appointments for the given date
  const bookedAppointments = await prisma_client.appointment.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  // Define the working hours and appointment duration (in minutes)
  const workingHoursStart = new Date(`${date}T09:00:00Z`); // e.g., 9:00 AM
  const workingHoursEnd = new Date(`${date}T17:00:00Z`); // e.g., 5:00 PM
  const appointmentDuration = 20 * 60 * 1000; // 20 minutes in milliseconds

  // Initialize available slots array
  const availableSlots = [];

  // Iterate through time slots between working hours
  let currentTimeSlot = workingHoursStart;

  for (const appointment of bookedAppointments) {
    // Check if there's a gap between the current time slot and the next booked appointment
    while (
      currentTimeSlot < appointment.startTime &&
      currentTimeSlot.getTime() + appointmentDuration <=
        appointment.startTime.getTime()
    ) {
      availableSlots.push(new Date(currentTimeSlot));
      currentTimeSlot = new Date(
        currentTimeSlot.getTime() + appointmentDuration
      );
    }

    // Move the current time slot to the end of the booked appointment
    currentTimeSlot = new Date(appointment.endTime.getTime());
  }

  // Add remaining slots after the last booked appointment until the end of working hours
  while (
    currentTimeSlot < workingHoursEnd &&
    currentTimeSlot.getTime() + appointmentDuration <= workingHoursEnd.getTime()
  ) {
    availableSlots.push(new Date(currentTimeSlot));
    currentTimeSlot = new Date(currentTimeSlot.getTime() + appointmentDuration);
  }

  // Extract hours and minutes from each ISO string
const times = availableSlots.map(dateStr => {
    const date = new Date(dateStr);
    const hours = date.getUTCHours().toString().padStart(2, '0'); // Format hours with leading zero if needed
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Format minutes with leading zero if needed
    return `${hours}:${minutes}`;
  });
 
  sendResponse(res,true,"Successfully Available Time fetched",times,200)
  
}


export {
    getAvailableTimeSlotsController
}