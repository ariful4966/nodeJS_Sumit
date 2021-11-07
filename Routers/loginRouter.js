const { getLogin, login, logout } = require("../Controllers/loginController");
const { redirectLoggedIn } = require("../Middlewares/commons/checkLogin");
const decorateHtmlResponse = require("../Middlewares/commons/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../Middlewares/login/loginValidators");

const page_title = "Login";

//external import
const router = require("express").Router();

//login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// logout user
router.delete("/", logout);

module.exports = router;
