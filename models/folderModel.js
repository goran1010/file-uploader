import prisma from "../db/prisma.js";

export async function findFolder(userId, name) {
  return await prisma.folder.findFirst({
    where: { name, userId },
    include: { files: true },
  });
}
