import createUserModel from "../models/createUserModel.js";

class RegisterController {
  register(req, res, next) {
    res.render("register");
  }

  async newUser(req, res, next) {
    await createUserModel(req, res, next);
    res.redirect("/");
  }
}

export default new RegisterController();
