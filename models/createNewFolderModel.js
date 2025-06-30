import prisma from "../db/prisma.js";

export default async function createNewFolderModel(id, name) {
  await prisma.folder.create({ data: { name: name, userId: id } });
}
