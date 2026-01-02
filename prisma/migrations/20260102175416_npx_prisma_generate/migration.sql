/*
  Warnings:

  - You are about to drop the column `counter` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "counter",
DROP COLUMN "subscriptions";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "userRef" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userRef_fkey" FOREIGN KEY ("userRef") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
