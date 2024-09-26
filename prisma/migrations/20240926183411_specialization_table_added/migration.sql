/*
  Warnings:

  - You are about to drop the column `specialization` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `specializationID` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "specialization",
ADD COLUMN     "specializationID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "specializationCategory" (
    "id" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,

    CONSTRAINT "specializationCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_specializationID_fkey" FOREIGN KEY ("specializationID") REFERENCES "specializationCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
