atl.controller('SongListController', 
    ['$rootScope', '$scope', '$log', 'audioManager',
    function($rootScope, $scope, $log, audioManager) {
        
        var play = function(items) {
            
            audioManager.setPlaybackQueue(items);
        	audioManager.startPlayback();
        };
        
        $scope.$on('songSelected', function onSongSelected(e, data) {
            
            play([data]);

            $log.log(data);
        });
        
        // rtc.connect('ngapp');
        
        // $rootScope.songs = songs;
}]);