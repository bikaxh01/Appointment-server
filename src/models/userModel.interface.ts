import { Gender, AppointmentStatus } from "@prisma/client";

export interface userModel {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  addressLine1?: string;
  documentUrl: string;
  city?: string;
  state?: string;
  country?: string;
  gender: Gender;
  password: string;
  verificationCode: number;
  documentNumber: string;
}

export interface AppointmentModel {
  patientID: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  date :string;
  doctorId: string;
}

export interface Doctor {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  country?: string;
  gender: Gender;
  password: string;
  specializationID: string;
  about?: string;
  avatarUrl?: string;
}
