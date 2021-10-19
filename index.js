//Dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environment");
const data = require("./lib/data");
const { sendTwilioSms } = require("./helpers/notifications");

//app object  module scaffolding

const app = {};

//test notification
//Todo remove later
sendTwilioSms("01863934966", "Hello world", (err) => {
  console.log(`this is the error `, err);
});

// testing file system

// TODO
// data.create('test', 'newFile', {'name': 'Bangladesh', 'language': 'Bangla'}, (err)=>{
//   console.log(`error was`, err);
// })

// data.read('test', 'newFile', (err, data)=>{
//   console.log(err, data);
// })

// data.update('test', 'newFile',{ 'name':'England', 'language': 'English'}, (err)=>{
//   console.log(err);
// })

// data.delete('test', 'newFile',(err)=>{
//   console.log(err);
// })

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Listening to port ${environment.port}`);
  });
};

//handle request handler
app.handleReqRes = handleReqRes;

app.createServer();
