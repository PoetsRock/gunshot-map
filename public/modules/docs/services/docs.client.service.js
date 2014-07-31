'use strict';

//Docs service used to communicate Docs REST endpoints
angular.module('docs').factory('Docs', ['$resource',
	function($resource) {
		return $resource('docs/:docId', { docId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);