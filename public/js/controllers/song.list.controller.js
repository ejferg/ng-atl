atl.controller('SongListController', 
    ['$rootScope', '$scope', '$log', 'audioManager', 'rtc',
    function($rootScope, $scope, $log, audioManager, rtc) {
        
        var play = function(items) {
            
            audioManager.setPlaybackQueue(items);
        	audioManager.startPlayback();
        };
        
        $scope.$on('songSelected', function onSongSelected(e, data) {
            
            play([data]);
            rtc.send('peerSongSelected', {message: data.itemID, room: "ngapp"});
        });
        
        $scope.$on('peerSongSelected', function onPeerSongSelected(e, data){
            play([data]);
        });
        
        // rtc.connect('ngapp');
        
        // $rootScope.songs = songs;
}]);