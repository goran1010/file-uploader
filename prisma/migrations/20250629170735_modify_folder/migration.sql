/*
  Warnings:

  - A unique constraint covering the columns `[originalname]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_originalname_key" ON "File"("originalname");

-- CreateIndex
CREATE UNIQUE INDEX "File_path_key" ON "File"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");
