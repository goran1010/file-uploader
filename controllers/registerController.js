import createUserModel from "../models/createUserModel.js";

class RegisterController {
  register(req, res, next) {
    res.render("register");
  }

  async newUser(req, res, next) {
    try {
      await createUserModel(req, res, next);
      req.flash("success", "User created successfully!");
    } catch (err) {
      req.flash("fail", "User not created!");
    }
    res.redirect("/");
  }
}

export default new RegisterController();
