const bcrypt = require("bcrypt");
const People = require("../Models/People");
const { unlink } = require("fs");
const path = require("path");

const getUsers = async (req, res, next) => {
  try {
    const users = await People.find();
    res.render("users", {
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  let newUser;
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new People({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashPassword,
    });
  } else {
    newUser = new People({
      ...req.body,
      password: hashPassword,
    });
  }
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error Occurred!",
        },
      },
    });
  }
};

// remove user
const removeUser = async (req, res, next) => {
  try {
    const user = await People.findByIdAndDelete({
      _id: req.params.id,
    });

    //remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
};

module.exports = { getUsers, addUser, removeUser };
