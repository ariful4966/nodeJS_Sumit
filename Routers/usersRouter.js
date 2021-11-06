const {
  getUsers,
  addUser,
  removeUser,
} = require("../Controllers/usersController");
const decorateHtmlResponse = require("../Middlewares/commons/decorateHtmlResponse");
const avatarUpload = require("../Middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../Middlewares/users/userValidators");

//external import
const router = require("express").Router();

//login page
router.get("/", decorateHtmlResponse("User Page"), getUsers);

// Create new user

router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

router.delete("/:id", removeUser);

module.exports = router;
