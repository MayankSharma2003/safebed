-- CreateTable
CREATE TABLE "AlertLogs" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "bed" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionTaken" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AlertLogs_pkey" PRIMARY KEY ("id")
);
