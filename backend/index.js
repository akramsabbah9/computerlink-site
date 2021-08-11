require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const routes = require("./routes");

const sessionOptions = {
    cookie: {
        maxAge: 24 * 60 * 1000, // 1 day
        sameSite: true,
        secure: "auto"
    },
    name: "computerlink-login",
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: [process.env.SESSIONSECRET],
    // store: new require('connect-pg-simple')(session))() // connect-pg-simple once in production
    // see https://www.npmjs.com/package/connect-pg-simple
};

const PORT = process.env.PORT || 3001;
const app = express();

// // set session cookie to be secure in production, and trust reverse proxy
// if (app.get("env") === "development") {
//     sessionOptions.cookie.secure = true;
//     app.set("trust proxy", 1);
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(session(sessionOptions));

app.get("/", (req, res) => res.json({message: "Hello World!"}));

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}.`);
});
