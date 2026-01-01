/*
  Warnings:

  - The primary key for the `Channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Channel` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The `subscription` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UsersOnChannels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `channelId` on the `UsersOnChannels` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UsersOnChannels` table. All the data in the column will be lost.
  - Added the required column `channelRef` to the `UsersOnChannels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userRef` to the `UsersOnChannels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsersOnChannels" DROP CONSTRAINT "UsersOnChannels_channelId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnChannels" DROP CONSTRAINT "UsersOnChannels_userId_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "subscription",
ADD COLUMN     "subscription" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- AlterTable
ALTER TABLE "UsersOnChannels" DROP CONSTRAINT "UsersOnChannels_pkey",
DROP COLUMN "channelId",
DROP COLUMN "userId",
ADD COLUMN     "channelRef" TEXT NOT NULL,
ADD COLUMN     "userRef" TEXT NOT NULL,
ADD CONSTRAINT "UsersOnChannels_pkey" PRIMARY KEY ("userRef", "channelRef");

-- AddForeignKey
ALTER TABLE "UsersOnChannels" ADD CONSTRAINT "UsersOnChannels_userRef_fkey" FOREIGN KEY ("userRef") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnChannels" ADD CONSTRAINT "UsersOnChannels_channelRef_fkey" FOREIGN KEY ("channelRef") REFERENCES "Channel"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
