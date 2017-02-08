'use strict';

const passport= require("passport");

const LocalStrategy = require("passport-local").Strategy;

const router = require("express").Router();

const User = require("./../models/User");

const Log = require("log");

const log = new Log('info');

const mongoose = require("mongoose");

const Book = require("./../models/Book");

const myBooksController = require("./MyBooksController");

const booksController = require("./BooksController");

const userController = require("./UserController");

router.post("/addbook", myBooksController.addBook);

router.post("/getbooksofuser", myBooksController.getBookOfUser);

router.post("/removebook", myBooksController.removebook);

router.post("/getrequests", booksController.getRequests);

//   #################
//   Dummy apis
//   #################
router.get("/getallbooks", booksController.getAllBook);

router.get("/getallusers", function(req,res){
  User.find({}).exec(function(err,data){
    if(err)
      throw err;
    res.send(data);
  })
});

//   #################
//   Dummy apis
//   #################

router.post("/signup", function(req,res){
  var user = req.body;
  log.info(user);
  User.findOne({
    username:user.username
  }).exec(function(err, data){
    if(err)
      throw err;
    if(data){
      res.send({
        success:false,
        msg:"username is taken"
      })
    }
    else{
      User.create(user, function(err, data){
        if(err)
          throw err;
        res.send({
          success:true
        })
      })
      
    }
  })
});

router.post("/updateinfo", function(req, res){
  log.info(req.body);
  
  User.findOneAndUpdate({
    username: req.body.username
  }, {
    city: req.body.data.city,
    name: req.body.data.name,
    state: req.body.data.state
  }).exec(function(err, data){
    if(err){
      throw err;
    } else{
      res.send({
        "ok": 1
      });
    }
  });

});

router.post("/requestbook", booksController.requestbook);

router.post("/acceptrequest", booksController.acceptRequest);

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    User.findOne({
      username:username
    }, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
          username:username
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false);
            }
            else{
              if(password==user.password){
                return done(null,user);
              }
              else{
                return done(null,false)
              }
            }
            
        });
    }));


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send({
          "success":false,
          "user":null
        }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({
          "success":true,
          "user":user
        })
    });
  })(req, res, next);
});

router.post("/getuserinfo", userController.getUserInfo);

router.get("/dropdbs", function(req, res){

  res.json({
    success: true
  });

  //drop collection user
  mongoose.connection.db.dropCollection("bcbooks", function(err, result){log.info(err, result)});

  //drop collection book
  mongoose.connection.db.dropCollection("bcusers", function(err, result){log.info(err, result)});

  //drop collection request
  mongoose.connection.db.dropCollection("bcrequests", function(err, result){log.info(err, result)});
});

module.exports = router;