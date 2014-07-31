'use strict';

// Configuring the Articles module
angular.module('docs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Docs', 'docs', 'dropdown', '/docs(/create)?');
		Menus.addSubMenuItem('topbar', 'docs', 'List Docs', 'docs');
		Menus.addSubMenuItem('topbar', 'docs', 'New Doc', 'docs/create');
	}
]);