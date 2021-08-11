require("dotenv").config();
const express = require("express");
const session = require("express-session");
const routes = require("./routes");

const sessionOptions = {
    cookie: {
        maxAge: 24 * 60 * 1000, // 1 day
        sameSite: true
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

// set session cookie to be secure in production, and trust reverse proxy
if (app.get("env") === "production") {
    sessionOptions.cookie.secure = true;
    app.set("trust proxy", 1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions)); // have to initialize before router
app.use(routes);

app.get("/", (req, res) => res.json({message: "Hello World!"}));

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}.`);
});
