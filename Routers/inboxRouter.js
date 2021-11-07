const { getInbox } = require("../Controllers/inboxController");
const { checkLogin } = require("../Middlewares/commons/checkLogin");
const decorateHtmlResponse = require("../Middlewares/commons/decorateHtmlResponse");

//external import
const router = require("express").Router();

//login page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
