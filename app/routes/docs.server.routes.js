'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var docs = require('../../app/controllers/docs');

	// Docs Routes
	app.route('/docs')
		.get(docs.list)
		.post(users.requiresLogin, docs.create);

	app.route('/docs/:docId')
		.get(docs.read)
		.put(users.requiresLogin, docs.hasAuthorization, docs.update)
		.delete(users.requiresLogin, docs.hasAuthorization, docs.delete);

	// Finish by binding the Doc middleware
	app.param('docId', docs.docByID);
};