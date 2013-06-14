atl.factory('rtc', 
    ['$rootScope', '$q', '$log', '$window', 
    function($rootScope, $q, $log, $window){

        var pc;
        var connect = function() {
            
            pc = new RTCPeerConnection(null);
        };
        
        var getMedia = function(options) {
            
            var d = $q.defer();
            
            $window.getUserMedia(options, 
                function onSuccess(stream) {
                
                    pc.addStream(stream);
                    pc.createOffer(onOfferCreated);
                    
                    var url = URL.createObjectURL(stream);
                    
                    return $rootScope.$apply(function(){
                        return d.resolve({stream: stream, url: url});
                    });
                },
                function onFail(err) {
                    
                   return $rootScope.$apply(function(){
                        return d.reject(err);
                    });
                });
            
            return d.promise;
        };
        
        var addStream = function(type, options) {
            
            var d = $q.defer();
            
            if(type == 'local') {
                
                return getMedia(options);
            } else {
                
            }
            
            return d.promise;
        };
        
        var onAddedRemoteStream = function(e) {
            
        };
        
        var onOfferCreated = function(desc) {
            
            pc.setLocalDescription(desc);
            
        };
        
        connect();
        
        return {
            addStream: addStream
        }
    
}]);