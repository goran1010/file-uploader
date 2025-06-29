import path from "node:path";
import fileUploadModel from "../models/fileUploadModel.js";
import prisma from "../db/prisma.js";

class indexController {
  home(req, res, next) {
    res.render("index", {
      error: req.flash("error"),
      successMsg: req.flash("success"),
    });
  }
  async fileUpload(req, res, next) {
    try {
      const { originalname, path, size } = req.file;
      await fileUploadModel(originalname, path, size);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  }
  download(req, res, next) {
    const filePath = path.resolve(
      "uploads",
      "5681888107dccd10e1e075e46f81786a"
    );
    res.download(filePath);
  }
  async folders(req, res, next) {
    const { id } = req.user;
    const allFolders = await prisma.user.findFirst({
      where: { id },
    });
    res.render("folders", { allFolders });
  }
}
export default new indexController();
