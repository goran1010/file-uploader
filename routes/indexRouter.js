import { Router } from "express";
const indexRouter = Router();
import indexController from "../controllers/indexController.js";
import logInController from "../controllers/logInController.js";
import registerRouter from "./registerRouter.js";
import logOutController from "../controllers/logOutController.js";
import isLoggedIn from "../auth/isLoggedIn.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

indexRouter.get("/", indexController.home);

indexRouter.post("/log-in", logInController);

indexRouter.get("/log-out", logOutController);

indexRouter.post(
  "/upload-file",
  isLoggedIn,
  upload.single("my-file"),
  indexController.fileUpload
);

indexRouter.get("/download", indexController.download);

indexRouter.get("/folders", isLoggedIn, indexController.folders);

indexRouter.use("/register", registerRouter);

indexRouter.use((req, res, next) => {
  res.status(404).render("errors/error-404");
});

export default indexRouter;
