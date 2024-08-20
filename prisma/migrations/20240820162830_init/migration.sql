/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `docter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `phone` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `verificationCode` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL,
ALTER COLUMN "gender" SET DATA TYPE TEXT,
DROP COLUMN "verificationCode",
ADD COLUMN     "verificationCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "docter_email_key" ON "docter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
