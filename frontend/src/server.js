const express = require("express");
const path = require("path")
const {PORT, host} = require("./lib/network");
const ejs = require("ejs");
const app = express();

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => res.render("index.html"))
app.get("/register", (req, res) => res.render("register.html"))
app.get("/login", (req, res) => res.render("login.html"))

app.listen(PORT, () => {
    console.log(`Frontend server is running ${host}`)
})