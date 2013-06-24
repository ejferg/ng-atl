atl.controller('AppController', 
    ['$rootScope', '$scope', '$log', 'util', 'rtc', 'songs',
    function($rootScope, $scope, $log, util, rtc, songs) {
        
        $rootScope.session = { token: util.uuid() };
        // rtc.connect('ngapp');
        // $rootScope.songs = songs;
        $scope.songs = songs;
}]);