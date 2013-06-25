atl.controller('AppController', 
    ['$rootScope', '$scope', '$log', 'util', 'rtc', 'songs',
    function($rootScope, $scope, $log, util, rtc, songs) {
        
        $rootScope.session = { token: util.uuid() };
        $rootScope.songs = songs;
        
        rtc.connect('ngapp');
        
        
        $scope.test = function() {
            rtc.send('chat_msg', {
          "messages": "test",
          "room": 'ngapp'
        }
      );
        }
        
}]);