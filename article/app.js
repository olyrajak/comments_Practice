var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");


var indexRouter = require("./routes/index");
var articleRouter = require("./routes/article");
var commentrouter = require("./routes/comment");

mongoose.connect("mongodb://localhost/articles", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDB");
    }
});

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/articles", articleRouter);

app.use("/comments", commentrouter);



app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});


app.use((err, req, res, next) => {
    res.send(err);
});

module.exports = app;


