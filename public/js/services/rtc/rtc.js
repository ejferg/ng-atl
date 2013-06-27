atl.factory('rtc', 
    ['$rootScope', '$q', '$log', '$window', 'util', 
    function($rootScope, $q, $log, $window, util){
    
    this.sender;
    this.channel = "";
    
    var wrtc = $window.rtc;
    var config = {
        "video": {"mandatory": {}, "optional": []},
        "audio": true
    };
    
    var send = function(event, data) {
        
        var channels = wrtc.dataChannels;
        var msg = angular.toJson({ eventName: event, sender: this.sender, data: data});
        
        angular.forEach(channels, function(channel) {
            
            channel.send(msg);
        });
    };
    
    var connect = function(channel) {
        
        this.sender = util.uuid();
        this.channel = channel;
        wrtc.connect("ws://ng-atl.ejferg.c9.io", channel);

        wrtc.on('data stream data', angular.bind(this, onMessageReceived));
        wrtc.on('add remote stream', onRemoteStreamAdded);
        wrtc.on('disconnect stream', onStreamDisconnected);

    };
    
    var createStream = function() {
        
        var deferred = $q.defer();
        
        wrtc.createStream(config, function onStreamCreated(stream){
            
            
            
            var url = URL.createObjectURL(stream);
            
            // util.toggleMuted(stream, false);
            
            return $rootScope.$apply(function() {
                return deferred.resolve({id: stream.id, url: url});
            });
        });
        
        return deferred.promise;
    };
    
    var attachStream = function(stream, id) {
        
        wrtc.attachStream(stream, id);
    }
    
    var onMessageReceived = function(e, data) {
        
        var event = angular.fromJson(data);
        
        if(event && (event.sender != this.sender)) {
            $rootScope.$broadcast(event.eventName, event.data.message);
        }
        
    };
    
    var onRemoteStreamAdded = function(stream, socketId) {
        
        $log.log(stream);

        var url = URL.createObjectURL(stream);
        $rootScope.$broadcast('remoteStreamAdded', {id: socketId, url: url});
        
    };
    
    var onStreamDisconnected = function(socketId) {
        
        $log.log(socketId);
        $rootScope.$broadcast('streamDisconnected', socketId);
    };
    
    return {
        send: send,
        connect: connect,
        attachStream: attachStream,
        createStream: createStream
    }
}]);