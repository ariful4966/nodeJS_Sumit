const bcrypt = require("bcrypt");
const People = require("../Models/People");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

const getLogin = (req, res, next) => {
  res.render("index");
};

// do login

const login = async (req, res, next) => {
  try {
    const user = await People.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        // prepare the user object ot generate token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // res logged in user identifier
        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createHttpError("Login failed! Please try again.");
      }
    } else {
      throw createHttpError("Login failed! Please try again.");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

// logout
const logout = (req, res, next) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged Out");
};

module.exports = { getLogin, login, logout };
