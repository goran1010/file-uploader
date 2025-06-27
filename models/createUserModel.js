import prisma from "../db/prisma.js";

export default async function createUserModel(req, res, next) {
  const { username, password } = req.body;
  await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}
