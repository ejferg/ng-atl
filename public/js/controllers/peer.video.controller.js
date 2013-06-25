atl.controller('PeerVideoController', 
    ['$rootScope', '$scope', '$log', 'rtc', 
    function($rootScope, $scope, $log, rtc){
        
        var streams = [];
        
        var createLocalStream = function() {
            
            rtc.createStream().then(function(url) {
                
                $scope.localStream = {id: 'you', url: url};
            });
        };
        
        var updateStream = function() {
            $scope.streams = streams;
            $scope.$apply();
        };
        
        var onRemoteStreamAdded = function(e, stream) {
            streams.push(stream);
            updateStream();
        };
        
        var onStreamDisconnected = function(e, id) {
            
            streams = _.filter(streams, function(item) { return item.id != id});
            updateStream();
        };
        
        createLocalStream();
        
        $rootScope.$on('remoteStreamAdded', onRemoteStreamAdded);
        $rootScope.$on('streamDisconnected', onStreamDisconnected);
}]);