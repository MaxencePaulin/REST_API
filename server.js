const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// path.join(__dirname,)
const dotenv = require("dotenv");
const laureatesRoutes = require("./routes/laureates.router.js");
const nobelsRoutes = require("./routes/nobels.router.js");
const hbengine = require("express-handlebars");
dotenv.config();

const port = process.env.PORT;
const app = express();

app.engine("hbs", hbengine.engine({
    defaultLayout: "main",
    extname: ".hbs"
}));

app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use((req, res, next) =>{
    console.log("Browser: "+ 
        req.headers["user-agent"]);
    console.log("Language: "+
        req.headers["accept-language"]);
    console.log("IP: "+
        JSON.stringify(req.ip));
    next();
});

app.use("/laureates", laureatesRoutes);
app.use("/api/laureates", (req, res) => {
    res.redirect("/laureates");
});

app.use("/nobels", nobelsRoutes);
app.use("/api/nobels", (req, res) => {
    res.redirect("/nobels");
});

app.get("/", (req, res) => {
    res.render("home", {
        posts: [
            {
                author: "Maxence",
                image: "https://picsum.photos/500/500",
                comments: ["En cours de développement"]
            }

        ]
    });
});

app.use("*",(req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render("error404.hbs");
});

app.listen(port, ()=>{
    console.log(`Le serveur ecoute sur port ${port}`);
});