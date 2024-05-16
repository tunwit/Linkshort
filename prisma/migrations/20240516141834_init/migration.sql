-- CreateTable
CREATE TABLE "linkcontainer" (
    "id" TEXT NOT NULL,
    "uniqueID" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "create_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "linkcontainer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "linkcontainer_uniqueID_key" ON "linkcontainer"("uniqueID");
