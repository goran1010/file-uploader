import { Router } from "express";
const indexRouter = Router();
import indexController from "../controllers/indexController.js";

indexRouter.get("/", indexController);

indexRouter.use((req, res, next) => {
  res.status(404).render("errors/error-404");
});

export default indexRouter;
