'use strict';

//Setting up route
angular.module('docs').config(['$stateProvider',
	function($stateProvider) {
		// Docs state routing
		$stateProvider.
		state('listDocs', {
			url: '/docs',
			templateUrl: 'modules/docs/views/list-docs.client.view.html'
		}).
		state('createDoc', {
			url: '/docs/create',
			templateUrl: 'modules/docs/views/create-doc.client.view.html'
		}).
		state('viewDoc', {
			url: '/docs/:docId',
			templateUrl: 'modules/docs/views/view-doc.client.view.html'
		}).
		state('editDoc', {
			url: '/docs/:docId/edit',
			templateUrl: 'modules/docs/views/edit-doc.client.view.html'
		});
	}
]);