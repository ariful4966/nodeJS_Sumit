const { getInbox } = require("../Controllers/inboxController");
const decorateHtmlResponse = require("../Middlewares/commons/decorateHtmlResponse");

//external import
const router = require("express").Router();

//login page
router.get("/", decorateHtmlResponse("Inbox Page"), getInbox);

module.exports = router;
