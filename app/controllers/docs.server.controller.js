'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Doc = mongoose.model('Doc'),
	_ = require('lodash');

var Twit = require('twit');
var keys = require('./keyData').keys;

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Doc already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Doc
 */
exports.create = function(req, res) {
	var doc = new Doc(req.body);
	doc.user = req.user;

	doc.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(doc);
		}
	});
};

/**
 * Show the current Doc
 */
exports.read = function(req, res) {
	res.jsonp(req.doc);
};

/**
 * Update a Doc
 */
exports.update = function(req, res) {
	var doc = req.doc ;

	doc = _.extend(doc , req.body);

	doc.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(doc);
		}
	});
};

/**
 * Delete an Doc
 */
exports.delete = function(req, res) {
	var doc = req.doc ;

	doc.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(doc);
		}
	});
};

/**
 * List of Docs
 */
exports.list = function(req, res) {
    var T = new Twit(keys);

    T.get('search/tweets', { q: 'gunshot OR gun shot OR gunshots OR gun shots AND heard since:2011-11-11', count: 100 }, function(err, data, response) {
        res.jsonp(data);
    });



//    Doc.find().sort('-created').populate('user', 'displayName').exec(function(err, docs) {
//		if (err) {
//			return res.send(400, {
//				message: getErrorMessage(err)
//			});
//		} else {
//			res.jsonp(docs);
//		}
//	});
};

/**
 * Doc middleware
 */
exports.docByID = function(req, res, next, id) { Doc.findById(id).populate('user', 'displayName').exec(function(err, doc) {
		if (err) return next(err);
		if (! doc) return next(new Error('Failed to load Doc ' + id));
		req.doc = doc ;
		next();
	});
};

/**
 * Doc authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.doc.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};