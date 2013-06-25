atl.controller('PeerVideoController', 
    ['$rootScope', '$scope', '$log', 'rtc', 
    function($rootScope, $scope, $log, rtc){
        
        var streams = [];
        
        var createLocalStream = function() {
            
            rtc.createStream().then(function(url) {
                
                $scope.localStream = {id: 'you', url: url};
            });
        };
        
        var onRemoteStreamAdded = function(stream) {
            streams.push(stream);
            $scope.streams = streams;
        };
        
        var onStreamDisconnected = function(stream) {
            
        };
        
        createLocalStream();
        
        $rootScope.$on('remoteStreamAdded', onRemoteStreamAdded);
        $rootScope.$on('streamDisconnected', onStreamDisconnected);
}]);