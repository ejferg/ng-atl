atl.controller('PlayBarController', 
    ['$rootScope', '$scope', '$log', 'audioManager', 'rtc', 
    function($rootScope, $scope, $log, audioManager, rtc) {
        
        $scope.state = 'play';
        
        var setPauseState = function(title) {
            $scope.state = 'pause';
            $scope.$apply();
        };
        
        var setPlayState = function() {
            
            $scope.state = 'play';
            $scope.$apply();
        };

        var togglePlay = function() {
            
            if($scope.state == 'pause') {
                
                audioManager.pausePlayback();
                
            } else {
                
                audioManager.resumePlayback();
            }
        };
        
        var skip = function() {
            
            $log.log('skip');
        };
        
        $scope.togglePlay = togglePlay;
        $scope.skip = skip;
        
        $rootScope.$on('startedPlaying', function onStartedPlaying(e, data) {
            
            $scope.title = data.itemTitle;
            setPauseState();
        });
        
        $rootScope.$on('stoppedPlaying', function onStoppedPlaying(e) {
            
            setPlayState();
        });
        
        $rootScope.$on('pausedPlaying', function onPausedPlaying(e) {
            
            setPlayState();
            rtc.send('peerTogglePlay', {message: "", room: "ngapp"});
        });
        
        $rootScope.$on('peerTogglePlay', function onPeerTogglePlay(e) {
            
            togglePlay();
            // if($scope.state == 'pause') {
                
            //     audioManager.pausePlayback(true);
            //     setPlayState();
                
            // } else {
                
            //     audioManager.resumePlayback(true);
            //     setPauseState();
            // }
        });
    
}]);