const { getUsers } = require("../Controllers/usersController");
const decorateHtmlResponse = require("../Middlewares/commons/decorateHtmlResponse");

//external import
const router = require("express").Router();

//login page
router.get("/", decorateHtmlResponse("User Page"), getUsers);

module.exports = router;
