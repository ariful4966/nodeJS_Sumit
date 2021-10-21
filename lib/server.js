//Dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");
const environment = require("../helpers/environment");

//app object  module scaffolding

const server = {};



//create server
server.createServer = () => {
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(environment.port, () => {
        console.log(`Listening to port ${environment.port}`);
    });
};

//handle request handler
server.handleReqRes = handleReqRes;

//start the server

server.init = () => {
    server.createServer();
}

//export 
module.exports = server;