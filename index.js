import express from "express";
import passport from "./auth/passport.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
import flash from "connect-flash";
app.use(flash());
import sessionMiddleware from "./auth/sessionMiddleware.js";

app.use(express.urlencoded({ extended: true }));

import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

import indexRouter from "./routes/indexRouter.js";

app.use(sessionMiddleware);
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.fail = req.flash("fail");
  next();
});

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("errors/error-500", {
    errorMessage: err.message || "Error 500: Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`App started at port: ${PORT}`);
});
