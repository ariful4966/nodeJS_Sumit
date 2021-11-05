const { getLogin } = require("../Controllers/loginController");
const decorateHtmlResponse = require("../Middlewares/commons/decorateHtmlResponse");

//external import
const router = require("express").Router();

//login page
router.get("/", decorateHtmlResponse("Login Page"), getLogin);

module.exports = router;
