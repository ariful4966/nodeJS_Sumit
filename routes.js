//dependencies;
const { sampleHandler } = require("./handlers/routersHandlers/sampleHandler");
const { userHandler } = require("./handlers/routersHandlers/userHandlers");
const { tokenHandler } = require("./handlers/routersHandlers/tokenHandler");
const { checkHandler } = require("./handlers/routersHandlers/checkHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
  check: checkHandler
};

module.exports = routes;
