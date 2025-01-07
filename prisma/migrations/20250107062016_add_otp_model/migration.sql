-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);
