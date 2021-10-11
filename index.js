const http = require("http");
const fs = require('fs')
const server = http.createServer((req, res) => {
  const myReadStream = fs.createReadStream(__dirname+'/bigdata.txt', 'utf-8')

  myReadStream.pipe(res);
});

server.listen(4000, () => {
  console.log("Listening on port 4000");
});
