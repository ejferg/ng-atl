atl.controller('AppController', 
    ['$rootScope', '$scope', '$log', 'util', 'rtc', 'songs',
    function($rootScope, $scope, $log, util, rtc, songs) {
        
        $rootScope.session = { token: util.uuid() };
        $scope.songs = songs;
        
        rtc.connect('ngapp');
        
}]);