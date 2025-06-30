import path from "node:path";
import fileUploadModel from "../models/fileUploadModel.js";
import prisma from "../db/prisma.js";
import createNewFolderModel from "../models/createNewFolderModel.js";

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
      include: { folders: true },
    });
    res.render("folders", { allFolders });
  }
  async createNewFolder(req, res, next) {
    const { name } = req.body;
    const { id } = req.user;
    await createNewFolderModel(id, name);
    res.redirect("/folders");
  }
  async deleteFolder(req, res, next) {
    await prisma.folder.delete({ where: { id: req.params.id } });
    res.redirect("/folders");
  }
  async renameFolder(req, res, next) {
    const { id, name } = req.body;
    await prisma.folder.update({ where: { id }, data: { name } });
    res.redirect("/folders");
  }
  async viewFolder(req, res, next) {
    const { id: userId } = req.user;
    const { name } = req.params;
    const folder = await prisma.folder.findFirst({ where: { name, userId } });
    console.log(folder);
    res.render("my-folder", { folder });
  }
}
export default new indexController();
