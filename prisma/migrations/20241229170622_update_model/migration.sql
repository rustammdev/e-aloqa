/*
  Warnings:

  - You are about to drop the column `region_id` on the `services` table. All the data in the column will be lost.
  - Added the required column `service_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_region_id_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "service_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "address_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "region_id";

-- CreateTable
CREATE TABLE "_ServiceRegions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ServiceRegions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ServiceRegions_B_index" ON "_ServiceRegions"("B");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceRegions" ADD CONSTRAINT "_ServiceRegions_A_fkey" FOREIGN KEY ("A") REFERENCES "regions"("region_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceRegions" ADD CONSTRAINT "_ServiceRegions_B_fkey" FOREIGN KEY ("B") REFERENCES "services"("service_id") ON DELETE CASCADE ON UPDATE CASCADE;
