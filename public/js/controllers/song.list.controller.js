atl.controller('SongListController', 
    ['$rootScope', '$scope', '$log', 'audioManager', 'rtc', 'util',
    function($rootScope, $scope, $log, audioManager, rtc, util) {
        
        $scope.songs = $rootScope.songs;
        
        var play = function(items) {
            
            audioManager.setPlaybackQueue(items);
        	audioManager.startPlayback();
        };
        
        $scope.$on('songSelected', function onSongSelected(e, data) {
            
            play([data]);
            rtc.send('peerSongSelected', {message: data.itemID, room: "ngapp"});
        });
        
        $scope.$on('peerSongSelected', function onPeerSongSelected(e, id) {
            
            var songs = $scope.songs;
            
            var song = _.findWhere(songs, {_id: id});
            var item = {
                itemID: id, 
                itemTitle: util.noExtenstion(song.name), 
                itemURL: song.download_url
            };
            
            play([item]);
        });
}]);