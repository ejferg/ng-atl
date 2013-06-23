
var atl = window.atl = angular.module('atl', ['ngResource']);

atl.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    
    $routeProvider
        .when('/', {
            templateUrl: '/views/app.view.html',
            controller: 'AppController',
            resolve: {
                songs: function(Song) {
                    return Song.get();
                }
            }
        })
        .otherwise({redirectTo: '/'})
}]);


    