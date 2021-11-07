const {
  getUsers,
  addUser,
  removeUser,
} = require("../Controllers/usersController");
const { checkLogin } = require("../Middlewares/commons/checkLogin");
const decorateHtmlResponse = require("../Middlewares/commons/decorateHtmlResponse");
const avatarUpload = require("../Middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../Middlewares/users/userValidators");

//external import
const router = require("express").Router();

//login page
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

// Create new user

router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

router.delete("/:id", removeUser);

module.exports = router;
