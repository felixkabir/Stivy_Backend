-- CreateTable
CREATE TABLE "ModelRequest" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modelId" TEXT NOT NULL,
    "userId" TEXT,
    "agencyId" TEXT,

    CONSTRAINT "ModelRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModelRequest" ADD CONSTRAINT "ModelRequest_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ModelEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModelRequest" ADD CONSTRAINT "ModelRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModelRequest" ADD CONSTRAINT "ModelRequest_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
