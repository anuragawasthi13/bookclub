import Express from "express";

import mongoose from "mongoose";

import exphbs from "express-handlebars";

import passport from "passport";

import bodyParser from "body-parser";

import path from "path";

require("dotenv").config();

const app = Express();

const PORT = process.env.PORT || 3000;

//connect to mlab mongo server
mongoose.connect(process.env.NODE_ENV == "development" ? "mongodb://localhost/bookclub" : process.env.MONGO_URI, function(err){
  if(err) throw err;
   console.log("connected to mlab mongo server");
});

app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.use(Express.static(path.resolve(__dirname + "./../public/")));

app.set('view engine', 'handlebars');

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());

app.use(passport.session());

app.use("/api", require("./api/api"));

app.get("/", function(req, res){
  res.status(200).end(renderFullPage());
});

function renderFullPage() {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux Socket.io Chat</title>
      </head>
      <body>
        <container id="react"></container>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
}
app.listen(PORT, function(){
  console.log("Server is listening on port "+PORT);
});