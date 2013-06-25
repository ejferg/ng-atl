atl.factory('rtc', ['$q', '$log', '$window', function($q, $log, $window){
    
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
            
            return deferred.resolve(url);
        });
        
        return deferred.promise;
    };
    
    var onRemoteStreamAdded = function(stream, socketId) {
        // console.log('peer ' + socketID + ' joined');
        // rtc.attachStream(stream,"you"); // <video id="you">
    };
    
    var onStreamDisconnected = function(data) {
        console.log('peer ' + data + ' disconnected');
    };
    
    return {
        connect: connect,
        createStream: createStream
    }
}]);