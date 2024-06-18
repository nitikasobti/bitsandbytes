import User from "../models/userModel.js";
import passport from "passport";
const registerUser = async (req, res, next) => {
  try {
    const { fullname, email, contact, password } = req.body;
    const user = new User({
      fullname,
      email,
      contact,
    });
    const newUser = await User.register(user, password);

    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(req.user);
    });
  } catch (err) {
    return res.json(err.message);
  }
};
const getLogin = (req, res) => {
  return res.status(401).json("Login failed");
};
const loginUser = async (req, res,next) => {
passport.authenticate("local", (err, user, info) => {
  if (err) {
    return next(err);
  }
  if (!user) {
    return res.status(401).json("Login failed");
  }
  req.logIn(user, function (err) {
    if (err) {
      return next(err);
    }
    return res.json(user);
  });
})(req, res, next);
};
const logoutUser = async (req, res, next) => {
  if (req.user) {
    req.logout(function () {
      req.session.destroy(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json("Error on logout");
        }
        res.clearCookie("session", {
          httpOnly: true,
          expires: new Date(0), 
          maxAge: 0, 
        });
        return res.json("Logged Out");
      });
    });
  } else {
    console.log(req.user)
    return res.status(500).json("User not logged in");
  }
};
const currentUserDetails = async (req, res) => {
  return res.status(200).json(req.user);
};
// const checkSession = async(req, res) => {
//   if (req.cookies["session"] && req.user) {
//     // If the session cookie and user exist, send the user data
//     return res.json({ user: req.user });
//   } else {
//     // If not, send a message indicating that the user is not logged in
//     return res.json({ user: null });
//   }
// };

export { registerUser, loginUser, getLogin, logoutUser, currentUserDetails };