import prisma from "../db/prisma.js";

export async function uploadFile(originalname, path, size, folderId) {
  return await prisma.file.create({
    data: { originalname, path, size, folderId },
  });
}
