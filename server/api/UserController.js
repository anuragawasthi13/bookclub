"use strict";

const UserController = {};

const User = require("./../models/User");

const Book = require("./../models/Book");

UserController.getUserInfo = function(req,res){
	console.log("getUserInfo",req.body);

	User.findOne({
		username: req.body.username
	},{
		_id: 0,
		__v:0
	}).exec(function(err, user){
		if(err) throw err;

		Book.find({
			owner: req.body.username
		},{
			__v: 0
		}).exec(function(err, books){
			res.send({
				success: true,
				user: user,
				books: books
			});	
		});
		
	});

}

module.exports = UserController;