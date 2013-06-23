atl.controller('AppController', 
    ['$rootScope', '$scope', '$log', 'util', 'rtc', 'songs',
    function($rootScope, $scope, $log, util, rtc, songs) {
        
        $rootScope.session = { token: util.uuid() };
        // rtc.connect('ngapp');
        
        
        $scope.songs = songs;
}]);