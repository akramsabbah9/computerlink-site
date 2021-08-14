require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const routes = require("./routes");

const sessionOptions = {
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: true
    },
    name: "computerlink-session",
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: [process.env.SESSIONSECRET],
    store: new pgSession()
};

const PORT = process.env.PORT || 3001;
const app = express();

// set session cookie to be secure in production, and trust reverse proxy
if (app.get("env") === "production") {
    sessionOptions.cookie.secure = true;
    app.set("trust proxy", 1);
}

// CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // change in production
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions)); // have to initialize before router
app.use("/api", routes);

app.get("/", (req, res) => res.json({message: "Hello World!"}));

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}.`);
});
