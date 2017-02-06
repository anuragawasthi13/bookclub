"use strict";

const Book = require("./../models/Book");

const Request = require("./../models/Request");
const booksController = {};

const Log = require("log");

const log = new Log("debug");

booksController.requestbook = function(req, res){
	log.info(req.body);

	Request.findOne({
		requestor: req.body.requestor,
		requested: req.body.book.owner,
		"book.bookId": req.body.book.bookId
	}).exec(function(err, data){
		if(err){
			throw err;
		}
		if(data){
			res.send({
				"ok": false
			});
		} else{
			var request = new Request();

			request.requestor = req.body.requestor;
			request.requested = req.body.book.owner;
			request.book.title = req.body.book.title;
			request.book.bookId = req.body.book.bookId;

			request.save((err)=>{
				if(err) throw err;
				res.send({
					"ok": true
				})
			});		
		}
	});
}

booksController.getRequests = function(req, res) {
	log.info(req.body);

	Request.find({
		requestor: req.body.username
	}).exec(function(err, myrequests){
		if(err) throw err;

		Request.find({
			requested: req.body.username
		}).exec(function(err, otherrequests){
			if(err) throw err;

			log.info(myrequests, otherrequests);

			res.json({
				myrequests: myrequests,
				otherrequests: otherrequests
			});
		});
	});
}


module.exports = booksController;