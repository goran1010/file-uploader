import path from "node:path";
import * as fileUploadModel from "../models/fileUploadModel.js";
import prisma from "../db/prisma.js";
import createNewFolderModel from "../models/createNewFolderModel.js";
import * as folderModel from "../models/folderModel.js";
import supabase from "../db/supabase.js";
import { Readable } from "stream";

class indexController {
  home(req, res, next) {
    res.render("index", {
      error: req.flash("error"),
      successMsg: req.flash("success"),
    });
  }
  async fileUpload(req, res, next) {
    const { originalname, size, buffer } = req.file;
    const { folderId, folderName } = req.body;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`${originalname}`, buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error || !data) {
      console.error("Supabase upload error:", error?.message);
      req.flash("error", "File upload failed");
      return res.redirect(`/folders/${folderName}`);
    }
    await fileUploadModel.uploadFile(originalname, data.path, size, folderId);
    return res.redirect(`/folders/${folderName}`);
  }

  async download(req, res, next) {
    const { id } = req.params;
    const filename = await prisma.file.findUnique({
      where: { id: id },
    });

    const { data } = await supabase.storage
      .from("uploads")
      .download(`${filename.originalname}`);

    const buffer = await data.arrayBuffer(); // convert blob to array buffer
    const stream = Readable.from(Buffer.from(buffer)); // create readable stream

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename.originalname}"`
    );
    res.setHeader(
      "Content-Type",
      filename.mimetype || "application/octet-stream"
    );

    stream.pipe(res); // pipe to response
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
