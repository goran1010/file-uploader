import { Router } from "express";
const registerRouter = Router();
import registerController from "../controllers/registerController.js";

registerRouter.get("/", registerController.register);

registerRouter.post("/", registerController.newUser);

export default registerRouter;
