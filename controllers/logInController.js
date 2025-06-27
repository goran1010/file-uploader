import passport from "../auth/passport.js";

const logInController = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: "Invalid credentials",
  successFlash: "Logged in successfully",
});
export default logInController;
//  [
//     body("username").trim().notEmpty().withMessage("username empty"),
//     body("password").trim().notEmpty().withMessage("password empty"),
//   ],
//     (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         req.flash("errors", errors.array());
//         return res.redirect("/");
//       }
//       next();
//     },
