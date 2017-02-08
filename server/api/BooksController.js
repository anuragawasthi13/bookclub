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
	}).exec(function(err, requestedbyme){
		if(err) throw err;

		Request.find({
			requested: req.body.username
		}).exec(function(err, requestedbyothers){
			if(err) throw err;

			res.json({
				myrequests: requestedbyme,
				otherrequests: requestedbyothers
			});
		});
	});
}

booksController.getAllBook = function(req,res){
  Book.find({}).exec(function(err,data){
    if(err)
      throw err;
    res.send(data);
  })
}

booksController.acceptRequest = function(req, res){
	log.info(req.body);

	let bookId, requestor;
	//request is accepted. so give the book to other user
	Request.findOne({
		_id: req.body.id
	}).exec(function(err, request){
		if(err) throw err;

		bookId = request.book.bookId;

		requestor = request.requestor;

		request.granted = true;

		request.book.owner = requestor;

		request.save();

		Book.findOneAndUpdate({
			bookId: bookId
		},{
			owner: requestor
		}, function(err, book){
			if(err) throw err;

			log.info(book);
			res.send({
				success: true,
				msg: "book request expected"
			});
		});
	});


}

module.exports = booksController;