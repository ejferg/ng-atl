atl.controller('AppController', 
    ['$rootScope', '$scope', '$log', 'util', 'rtc', 'songs',
    function($rootScope, $scope, $log, util, rtc, songs) {
        
        $rootScope.songs = songs;
        
        $scope.sideMenuState = 'hide';
        
        $scope.content = {
            sideMenu: "ui/side.menu.html",
        }
        
        rtc.connect('ngapp');
        
        
}]);