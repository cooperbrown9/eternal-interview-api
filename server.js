import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import sessions from "express-session";
import MongoStore from "connect-mongo";
import { AuthRouter, UserRouter } from "./routes/index.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      callback(null, true);
    },
  })
);

// Parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.jkeg1co.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then((db) => {
    console.log("DB Connected");
  })
  .catch((e) => console.log(e));


// if store sets expiration date, set resave: true
const WEEK = 1000 * 60 * 60 * 24 * 7;

// Init sessions
app.use(
  sessions({
    resave: false,
    saveUninitialized: true,
    secret: "abc123",
    store: MongoStore.create({ mongoUrl: "mongodb+srv://admin:admin@cluster0.jkeg1co.mongodb.net/?retryWrites=true&w=majority" }), //sessionStore,
    cookie: { httpOnly: false, maxAge: WEEK },
    name: "eternal", //cookie name
  })
);

// configure routers
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("listening on port " + PORT));
