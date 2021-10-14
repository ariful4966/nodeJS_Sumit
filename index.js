//Dependencis
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");


//app object  module scaffolding

const app = {};

//configuration
app.config = {
  port: 5000,
};

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`Listening to port ${app.config.port}`);
  });
};

//handle request handler
app.handleReqRes = handleReqRes;

app.createServer();
