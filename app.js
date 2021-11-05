require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Internal import
const {
  notfoundHandler,
  errorHandler,
} = require("./Middlewares/commons/errorHandler");
const loginRouter = require("./Routers/loginRouter");
const usersRouter = require("./Routers/usersRouter");
const inboxRouter = require("./Routers/inboxRouter");

const app = express();

// database Connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connection Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder

app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing Setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);
// 404 not found handler
app.use(notfoundHandler);
// error Handling
app.use(errorHandler);

// application listening
app.listen(process.env.PORT, () => {
  console.log("App listening on port " + process.env.PORT);
});
