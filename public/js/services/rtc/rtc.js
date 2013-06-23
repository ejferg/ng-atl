atl.factory('rtc', 
    ['$rootScope', '$q', '$log', '$window', '$timeout', 'util', 'signaler', 'peerConn',
    function($rootScope, $q, $log, $window, $timeout, util, signaler, peerConn) {
        
        var sdpParts = {};
        var participants = {};
        var channel, userToken;
        
        
        var join = function(token) {
            
            signaler.send('participantAdded', {
                participant: {
                    userToken: userToken
                }
            });
        };
        
        var connectPeer = function(options) {
            
            var options = {
                channel: options.channel,
                type: options.type,
                onIceReady: onIceReady,
                onCreated: options.onCreated,
            };
            
            peerConn.connect(options);
        };
        
        var connectSignaler = function(channel) {
            
            userToken = $rootScope.session.token;
            
            var options = {
                channel: channel,
                token: userToken,
                onMessage: onMessageRecieved
            };
            
            return signaler.connect(options).then(function(data){
                
                if(!data) {
                    
                    broadcast();
                    
                } else {
                    
                    if(!data.hasOwnProperty('broadcaster')){
                    
                        broadcast();
                    }
                }
                
                return data;
            });
        };
        
        var connect = function(channel) {
        
            $log.log($rootScope.session.user);
            
            // this.channel = channel;
            
            connectSignaler(channel).then(function(){
                
                connectPeer({
                    channel: channel, 
                    type: 'offer', 
                    onCreated: onOfferCreated
                });
                
            });
            
        };
        
        var  broadcast = function() {
            
            signaler.send(null, {name: 'broadcaster', value: userToken}, 'set');
        };
        
        var isValidParticipant = function(participant) {
            
            if(!participant)
                return false;
                
            if(participants.hasOwnProperty(participant.token))
                return false;
                
            if(participant.token == userToken)
                return false;
                
            return true;
        };
        
        var onIceReady = function(candidate) {
            
            signaler.send('candidateAdded', {
               candidate: {
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    candidate: angular.toJson(candidate.candidate)
                    
                }
            });
        };
        
        var onMessageRecieved = function(res) {
            
            $log.log('RTC :: message recieved ::');
            
            if(res.type == 'participantAdded') {
                
                if(isValidParticipant(res.participant)) {
                    
                    participants[res.participant.token] = res.data;
                    $rootScope.$broadcast(res.type, res.data);
                }
                
                return;
            }
            
            if(res.type == 'offerAdded') {
                
                var data = res.data;
                
                if(data.firstPart) {
                    
                    sdpParts.firstPart = data.firstPart;
                }
                
                if(data.secondPart) {
                    
                    sdpParts.secondPart = data.secondPart;
                }
                
                if(data.thirdPart) {
                    
                    sdpParts.thirdPart = data.thirdPart;
                }
                
                if(sdpParts.firstPart && sdpParts.secondPart && sdpParts.thirdPart) {
                    $log.log('WE HAVE ALL');
                };
            }
            
            if(res.type == 'candidateAdded') {
                
                var data = res.data;
                
                peerConn.addCandidate({
                    sdpMLineIndex: data.candidate.sdpMLineIndex,
                    candidate    : angular.fromJson(data.candidate.candidate)
                });
            }
        };
        
        
        var onOfferCreated = function(data) {
            
            signaler.send('offerAdded', data, 'sdp');
        };
        
        
        
        return {
            connect: connect,
            join: join
        }
        
        //  numb.viagenie.ca
        // Username:        ngappatl@yahoo.com
        // var localPeerConn, localDataConn, remoteDataConn, remotePeerConn;
        
        // var channelServer = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
        // var channelConfig = {optional: [{RtpDataChannels: true}]};
        
        // var connect = function() {
            
        //     localPeerConn = new RTCPeerConnection(channelServer, channelConfig);
        //     remotePeerConn = new RTCPeerConnection(channelServer, channelConfig);
        // };
        
        // var getMedia = function(options) {
            
        //     var d = $q.defer();
            
        //     $window.getUserMedia(options, 
        //         function onSuccess(stream) {
                
        //             localPeerConn.addStream(stream);
        //             localPeerConn.createOffer(onOfferCreated);
                    
        //             var url = URL.createObjectURL(stream);
                    
        //             return $rootScope.$apply(function(){
        //                 return d.resolve({stream: stream, url: url});
        //             });
        //         },
        //         function onFail(err) {
                    
        //            return $rootScope.$apply(function(){
        //                 return d.reject(err);
        //             });
        //         });
            
        //     return d.promise;
        // };
        
        // var addStream = function(type, options) {
            
        //     var d = $q.defer();
            
        //     if(type == 'local') {
                
        //         return getMedia(options);
        //     } else {
                
        //     }
            
        //     return d.promise;
        // };
        
        // var addChannelListeners = function(channel) {
            
        //     channel.onmessage = function onMessageReceived(e) {
        //         $log.log('received a message:', e.data);
        //     };
        
        //     channel.onopen = function onChannelOpen(data) {
        //         $log.log(data);
        //         $log.log('rtc :: channel open ::');
        //         channel.send('hellop');
        //     };
            
        //     channel.onclose = function onChannelClose(e) {
        //         $log.error(e);
        //     };
        //     channel.onerror = function onError(e) {
        //         $log.error(e);
        //     };
        // };
        
        // var createChannel = function(options) {

        //     var d = $q.defer();
        //     var type = options.type;
        //     var sdp = options.sdp;
        //     var defaultPeerConn, attachedPeerConn;
            
        //     if(type == 'local') {
                
        //         defaultPeerConn = localPeerConn;
        //         attachedPeerConn = remotePeerConn;
                
        //     } else {
                
        //         defaultPeerConn = remotePeerConn;
        //         attachedPeerConn = localPeerConn;
        //     }
            
            
        //     var dataConn = defaultPeerConn.createDataChannel("ngApp", {reliable: false});
        //     addChannelListeners(dataConn);
            
        //     defaultPeerConn.onicecandidate = function onIceCandidateReady(e) {
                
        //         if (e.candidate) {
                    
        //             attachedPeerConn.addIceCandidate(new RTCIceCandidate(e.candidate));
        //         }
        //     };
            
        //     if(type == 'local') {
                
        //         defaultPeerConn.createOffer(function onOfferCreated(desc) {
                
        //             defaultPeerConn.setLocalDescription(desc);
                    
        //             return $rootScope.$apply(function() {
        //                 d.resolve({dataConn: dataConn, peerConn: defaultPeerConn, desc: desc});
        //             });
        //         });
                
        //     } else {
                
        //         defaultPeerConn.setRemoteDescription(sdp);
                
        //         defaultPeerConn.createAnswer(function onAnswerCreated(desc) {
                
        //             defaultPeerConn.setLocalDescription(desc);
        //             attachedPeerConn.setRemoteDescription(desc);

        //             return $rootScope.$apply(function() { 
        //                 d.resolve({dataConn: dataConn, peerConn: defaultPeerConn, desc: desc});
        //             });
        //         });
        //     }
            
        //     return d.promise;
        // };
        
        // var addDataChannel = function() {
            
        //     return createChannel({type: 'local'}).then(function(data){
                    
        //             localDataConn = data.dataConn;
                    
        //             return createChannel({type: 'remote', sdp: data.desc}).then(function(data){
        //                 remoteDataConn = data.dataConn;
                        
        //                 return data;
        //             });
        //     });
        // };
        
        // var send = function(msg) {
            
        //     localDataConn.send(msg);
        //     remoteDataConn.send(msg);
        // };
        
        // var onAddedRemoteStream = function(e) {
            
        // };
        
        // var onOfferCreated = function(desc) {
            
        //     localPeerConn.setLocalDescription(desc);
            
        // };
        
        // connect();
        
        // return {
        //     addStream: addStream,
        //     addDataChannel: addDataChannel,
        //     send: send
        // }
    
}]);