const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config({ path: "./config/.env" });

const INSTANCE = process.env.INSTANCE || "";
const MONGO_URI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 3000;
const SESSION_OPTIONS = {
  cookie: {
    /* cookie's lifetime: 4h */
    maxAge: 1000 * 60 * 60 * 4,
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET || "",
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
};

const app = express();

/* set view engine */
app.set("view engine", "ejs");

/* set middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session(SESSION_OPTIONS));

/* set connection with mongo */
mongoose
  .connect(MONGO_URI)
  .then((result) => {
    console.log(`${INSTANCE} -> ${result.connection.host}`);
    app.listen(PORT, () => {
      console.log(`${INSTANCE} -> ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
