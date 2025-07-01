import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";

export default async function createUserModel(req, res, next) {
  let { username, password } = req.body;
  password = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}
