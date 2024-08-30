/*
  Warnings:

  - You are about to drop the column `docterId` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the `docter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_docterId_fkey";

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "docterId",
ADD COLUMN     "doctorId" TEXT,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "note" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'user',
ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "docter";

-- CreateTable
CREATE TABLE "doctor" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "addressLine1" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "gender" "Gender" NOT NULL,
    "specialization" TEXT NOT NULL,
    "about" TEXT,
    "avatarUrl" TEXT,
    "userType" TEXT NOT NULL DEFAULT 'doctor',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_email_key" ON "doctor"("email");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
