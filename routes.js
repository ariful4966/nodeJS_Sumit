//dependencies;
const { sampleHandler } = require("./handlers/routersHandlers/sampleHandler");
const { userHandler } = require("./handlers/routersHandlers/userHandlers");

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
