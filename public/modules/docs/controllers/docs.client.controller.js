'use strict';

// Docs controller
angular.module('docs').controller('DocsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Docs',
    function($scope, $http, $stateParams, $location, Authentication, Docs ) {
        $scope.authentication = Authentication;

        // Create new Doc
        $scope.create = function() {
            // Create new Doc object
            var doc = new Docs ({
                name: this.name
            });

            // Redirect after save
            doc.$save(function(response) {
                $location.path('docs/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Doc
        $scope.remove = function( doc ) {
            if ( doc ) { doc.$remove();

                for (var i in $scope.docs ) {
                    if ($scope.docs [i] === doc ) {
                        $scope.docs.splice(i, 1);
                    }
                }
            } else {
                $scope.doc.$remove(function() {
                    $location.path('docs');
                });
            }
        };

        // Update existing Doc
        $scope.update = function() {
            var doc = $scope.doc ;

            doc.$update(function() {
                $location.path('docs/' + doc._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Docs
        $scope.find = function() {
            //$scope.docs = Docs.query();
            $http.get('docs').success(function(data){
                //create temporary array and parse through data for duds. If a good one appears, push it to the array.
                var tempArray = [];
                for (var i = 0; i < data.statuses.length; i++) {
                    if (data.statuses[i].geo) {
                        tempArray.push(data.statuses[i]);
                    }
                }
                $scope.docs = tempArray;
            });

            /*$http.get('docs').$promise.then(function(data){
             $scope.docs = data;
             });*/
        };

        // Find existing Doc
        $scope.findOne = function() {
            $scope.doc = Docs.get({
                docId: $stateParams.docId
            });
        };
    }
]);