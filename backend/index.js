const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./config/connection");

const sess = {
    secret: "Change this later",
    cookie: { maxAge: 10 * 60 * 1000 }, // maxAge is 10 minutes
    resave: false,
    rolling: true,
    saveUninitialized: true,
    // store: new SequelizeStore({
    //     db: sequelize
    // })
};

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(session(sess));


