atl.controller('PlayBarController', 
    ['$rootScope', '$scope', '$log', 'audioManager', 
    function($rootScope, $scope, $log, audioManager) {
        
        $scope.state = 'play';
        
        $scope.togglePlay = function() {
            
            if($scope.state == 'pause') {
                
                audioManager.stopPlayback();
            } else {
                
                audioManager.resumePlayback();
            }
        };
        
        $scope.skip = function() {
            
            $log.log('skip');
        };
        
        $rootScope.$on('startedPlaying', function onStartedPlaying(e, data){
            
            $scope.state = 'pause';
            $scope.title = data.itemTitle;
            $scope.$apply();
        });
        
        $rootScope.$on('stoppedPlaying', function onStoppedPlaying(e){
            
            $scope.state = 'play';
            $scope.$apply();
        });
        
        $rootScope.$on('pausedPlaying', function onPausedPlaying(e){
            
            $scope.state = 'play';
            $scope.$apply();
        });
    
}]);