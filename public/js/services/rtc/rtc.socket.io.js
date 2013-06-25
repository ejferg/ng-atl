atl.factory('rtc', 
    ['$rootScope', '$q', '$log', '$window', '$timeout', 'util',
    function($rootScope, $q, $log, $window, $timeout, util) {
        
        var wrtc = $window.rtc;
        var streamConfig = {
              "video": {"mandatory": {}, "optional": []},
              "audio": true
            };
        
        var join = function(token) {
            
        };
        
        var connect = function(channel) {
            
            wrtc.connect('ws://ng-atl.ejferg.c9.io', channel);
            
            wrtc.on('add remote stream',onRemoteStreamAdded);
            wrtc.on('disconnect stream', onStreamDisconnected);

        };
        
        var createStream = function() {
            
            var deferred = $q.defer();
            
            wrtc.createStream(streamConfig, function onStreamCreate(stream){
                
                var url = URL.createObjectURL(stream);
                
                return deferred.resolve(url);
            });
            
            return deferred.promise;
        }
        
        var onRemoteStreamAdded = function(stream, socketId) {
            
            // wrtc.attachStream(stream,"you"); // <video id="you">
        };
        
        var onStreamDisconnected = function(stream, socketId) {
            
        };
        
        return {
            connect: connect,
            createStream: createStream
        }
    
}]);