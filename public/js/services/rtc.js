atl.factory('rtc', 
    ['$rootScope', '$q', '$log', '$window', 
    function($rootScope, $q, $log, $window){

        var localPeerConn;
        var remotePeerConn;
        
        var connect = function(server, options) {
            
            localPeerConn = new RTCPeerConnection(server, options);
            remotePeerConn = new RTCPeerConnection(server, options);
        };
        
        var getMedia = function(options) {
            
            var d = $q.defer();
            
            $window.getUserMedia(options, 
                function onSuccess(stream) {
                
                    localPeerConn.addStream(stream);
                    localPeerConn.createOffer(onOfferCreated);
                    
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
        
        var addChannelListeners = function(channel) {
            
            channel.onmessage = function onMessageReceived(e) {
                $log.log('received a message:', e.data);
            };
        
            channel.onopen = function onChannelOpen() {
                $log.log('rtc :: channel open ::');
            };
            
            channel.onclose = function onChannelClose(e) {
                $log.error(e);
            };
            channel.onerror = function onError(e) {
                $log.error(e);
            };
        };
        
        var createChannel = function(options) {

            var d = $q.defer();
            var type = options.type;
            var sdp = options.sdp;
            var defaultPeerConn, attachedPeerConn;
            
            if(type == 'local') {
                
                defaultPeerConn = localPeerConn;
                attachedPeerConn = remotePeerConn;
                
            } else {
                
                defaultPeerConn = remotePeerConn;
                attachedPeerConn = localPeerConn;
            }
            
            var dataConn = defaultPeerConn.createDataChannel("ngApp", {reliable: false});
            addChannelListeners(dataConn);
            
            defaultPeerConn.onicecandidate = function onIceCandidateReady(e) {
                
                if (!e || !e.candidate) return;
                attachedPeerConn && attachedPeerConn.addIceCandidate(e.candidate);
            };
            
            if(type == 'local') {
                
                defaultPeerConn.createOffer(function onOfferCreated(desc) {
                
                    defaultPeerConn.setLocalDescription(desc);
                    return d.resolve({peerConn: defaultPeerConn, desc: desc});
                });
                
            } else {
                
                defaultPeerConn.setRemoteDescription(sdp);
                
                defaultPeerConn.createAnswer(function onAnswerCreated(desc) {
                
                    defaultPeerConn.setLocalDescription(desc);
                    attachedPeerConn.setRemoteDescription(desc);

                    return d.resolve({peerConn: defaultPeerConn, desc: desc});
                });
            }
            
            return d.promise;
        };
        
        var addDataChannel = function() {
            
            return createChannel({type: 'local'}).then(function(data){
                    
                    return createChannel({type: 'remote', sdp: data.desc});
            });
        };
        
        
        var onAddedRemoteStream = function(e) {
            
        };
        
        var onOfferCreated = function(desc) {
            
            localPeerConn.setLocalDescription(desc);
            
        };
        
        connect();
        
        return {
            addStream: addStream,
            addDataChannel: addDataChannel
        }
    
}]);