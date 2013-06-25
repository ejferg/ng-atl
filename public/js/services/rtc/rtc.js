atl.factory('rtc', 
    ['$rootScope', '$q', '$log', '$window', 
    function($rootScope, $q, $log, $window){
    
    var wrtc = $window.rtc;
    var config = {
        "video": {"mandatory": {}, "optional": []},
        "audio": true
    };
    
    var streams = {};
    
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
    
    var attachStream = function(stream, id) {
        
        wrtc.attachStream(stream, id);
    }
    
    var onRemoteStreamAdded = function(stream, socketId) {
        
        $log.log(stream);

        var url = URL.createObjectURL(stream);
        $rootScope.$broadcast('remoteStreamAdded', {id: socketId, url: url});
        
    };
    
    var onStreamDisconnected = function(data) {
        $log.log(data);
        $rootScope.$broadcast('streamDisconnected', data);
    };
    
    return {
        connect: connect,
        attachStream: attachStream,
        createStream: createStream
    }
}]);