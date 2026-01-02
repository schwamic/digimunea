-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptions" JSONB[] DEFAULT ARRAY[]::JSONB[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userRef" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "UsersOnChannels" (
    "userRef" TEXT NOT NULL,
    "channelRef" TEXT NOT NULL,

    CONSTRAINT "UsersOnChannels_pkey" PRIMARY KEY ("userRef","channelRef")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userRef_fkey" FOREIGN KEY ("userRef") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnChannels" ADD CONSTRAINT "UsersOnChannels_userRef_fkey" FOREIGN KEY ("userRef") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnChannels" ADD CONSTRAINT "UsersOnChannels_channelRef_fkey" FOREIGN KEY ("channelRef") REFERENCES "Channel"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
