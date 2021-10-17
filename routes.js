//dependencies;
const { sampleHandler } = require("./handlers/routersHandlers/sampleHandler");
const { userHandler } = require("./handlers/routersHandlers/userHandlers");
const { tokenHandler } = require("./handlers/routersHandlers/tokenHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
