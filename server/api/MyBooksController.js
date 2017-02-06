"use strict";


const google = require("googleapis");

const books = google.books('v1');

const Book = require("./../models/Book");

const myBooksController = {};

const API_KEY = process.env.Google_Key;

const User = require("./../models/User");

const Log = require("log");

const log = new Log('info');

const puid = require("puid");

myBooksController.addBook = function(req,res){

  const bookname = req.body.addbook;
  books.volumes.list({
    auth: API_KEY,
    q:bookname,
    country: "in"
  }, function(err, data){
      if(err){
        throw err;
      }
      if(data){
        var newbook = new Book({
        bookId: new puid().generate(),
        title: data.items[0].volumeInfo.title,
        owner:req.body.user,
        cover: data.items[0].volumeInfo.imageLinks=='undefined'?'':data.items[0].volumeInfo.imageLinks.thumbnail,
        requested: false
      });
      newbook.save(function(err,data){
        if(err)
          throw err;
        res.send(data);
      });
    } else{

    }
    
  });  
};

myBooksController.getBookOfUser = function(req,res){
  var user = req.body.user;
  Book.find({
    owner: user
  }).exec(function(err, data){
    if(err)
      throw err;
    res.send({
      success: true,
      books: data
    });
  });
};

myBooksController.removebook = function(req,res){
  const ID= req.body.id;
  console.log(ID);
  Book.findOne({
    _id:ID
  }, function(err, data){
    if(err)
      throw err;
    data.remove();
    res.send({
      success:true
    })
  });
};



module.exports = myBooksController;