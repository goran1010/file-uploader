import path from "node:path";
import * as fileUploadModel from "../models/fileUploadModel.js";
import prisma from "../db/prisma.js";
import createNewFolderModel from "../models/createNewFolderModel.js";
import * as folderModel from "../models/folderModel.js";

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
      const { folderId, folderName } = req.body;
      const file = await fileUploadModel.uploadFile(
        originalname,
        path,
        size,
        folderId
      );
      res.redirect(`/folders/${folderName}`);
    } catch (err) {
      console.error(err);
      res.redirect(`/folders/${folderName}`);
    }
  }
  async download(req, res, next) {
    const { filepath } = req.params;
    const setPath = `${filepath[0]}/${filepath[1]}`;
    const filename = await prisma.file.findUnique({
      where: { path: setPath },
    });
    const file = path.resolve("uploads", filepath[1]);
    res.download(file, filename.originalname);
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
    const folder = await folderModel.findFolder(userId, name);
    res.render("my-folder", { folder });
  }
}
export default new indexController();
