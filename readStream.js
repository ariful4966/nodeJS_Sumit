const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(
      ` <html>
          <head>
            <title>Form</title>
          </head>
        </html>`
    );
    res.write(
      ` <body>
          <form method="post" action="/process">
            <input name="message"></input>
          </form>
        </body>`
    );
    res.end();
  } else if (req.url === "/process" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      console.log("strem finished");
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);

      res.write("Thank for submitting");
      res.end();
    });
  } else {
    res.write("Not Found");
    res.end();
  }
});

server.listen(4000, () => {
  console.log("Listening on port 4000");
});
