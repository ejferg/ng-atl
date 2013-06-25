atl.factory('rtc', 
    ['$rootScope', '$q', '$log', '$window', 
    function($rootScope, $q, $log, $window){
    
    var wrtc = $window.rtc;
    var config = {
        "video": {"mandatory": {}, "optional": []},
        "audio": true
    };
    
    var connect = function(channel) {
        
        wrtc.connect("ws://ng-atl.ejferg.c9.io", channel);

        wrtc.on('add remote stream', onRemoteStreamAdded);
        wrtc.on('disconnect stream', onStreamDisconnected);

    };
    
    var createStream = function() {
        
        var deferred = $q.defer();
        
        wrtc.createStream(config, function onStreamCreated(stream){
            
            var url = URL.createObjectURL(stream);
            
            return $rootScope.$apply(function() {
                return deferred.resolve(url);
            });
        });
        
        return deferred.promise;
    };
    
    var onRemoteStreamAdded = function(stream, socketId) {
        // console.log('peer ' + socketID + ' joined');
        // rtc.attachStream(stream,"you"); // <video id="you">
        
        $log.log(stream);
        
        wrtc.attachStream(stream, socketId);
        $rootScope.$broadcast('remoteStreamAdded', {id: socketId, stream: stream});
        
    };
    
    var onStreamDisconnected = function(data) {
        
        $rootScope.$broadcast('streamDisconnected', data);
    };
    
    return {
        connect: connect,
        createStream: createStream
    }
}]);