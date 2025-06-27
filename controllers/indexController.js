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
    res.download(`/uploads/5681888107dccd10e1e075e46f81786a`);
  }
}
export default new indexController();
