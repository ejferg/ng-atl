atl.factory('peerConn', ['$window', '$log', function($window, $log){
    
    var w = $window,
            PeerConnection = w.mozRTCPeerConnection || w.webkitRTCPeerConnection,
            SessionDescription = w.mozRTCSessionDescription || w.RTCSessionDescription,
            IceCandidate = w.mozRTCIceCandidate || w.RTCIceCandidate;
        
    var pc, dataChannel, createHandler, offerHandler, answerHandler;
    
    var STUN = {
        url: 'stun:stun.l.google.com:19302'
    };
    
    var TURN = { 
        url: 'turn:ngappatl%40yahoo.com@numb.viagenie.ca', 
        credential: 'ngappatl'
    };

    var iceServers = { iceServers: [STUN, TURN] };
    
    var optional = {
        optional: [
                {RtpDataChannels: true},
                {DtlsSrtpKeyAgreement: true}
        ]
    };
    
    var setBandwidth = function(sdp) {

        // remove existing bandwidth lines
        sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, '');

        sdp = sdp.replace(/a=mid:data\r\n/g, 'a=mid:data\r\nb=AS:1638400\r\n');

        return sdp;
    };
    
    var constraints = {
        optional: [],
        mandatory: {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: false
        }
    };
    
    var createAnswer = function(constraints, cb) {
       
       pc.createAnswer(cb, null, constraints);
    };
    
    var createOffer = function(constraints, cb) {
        pc.createOffer(cb, null, constraints);
    };
    
    var createChannel = function(options) {

            var createMethod, handler;
            var sdp = options.sdp;
            var type = options.type;
            
            if(type == 'offer') {
                
                createMethod = createOffer;
                handler = offerHandler;
            } else {
                
                createMethod = createAnswer;
                handler = answerHandler;
            }
            
            if(sdp) {
                
                sdp = new SessionDescription(sdp);
                pc.setRemoteDescription(sdp);
            }
            
            createMethod(constraints, function onCreated(desc) {
                
                desc.sdp = setBandwidth(desc.sdp);
                pc.setLocalDescription(desc);
                
                if(createHandler) {
                    
                    createHandler(desc);
                }
            });
    };
    
    var addDataChannel = function(name, type) {
            
        var reliability = { reliable: false };
        dataChannel = pc.createDataChannel(name, reliability);
        
        addChannelListeners(dataChannel);
        createChannel({type: type});
    };
        
    var addChannelListeners = function(channel) {
            
        channel.onmessage = function onMessageReceived(e) {
            $log.log('received a message:', e.data);
        };
    
        channel.onopen = function onChannelOpen(data) {
            $log.log(data);
            $log.log('rtc :: channel open ::');
        };
        
        channel.onclose = function onChannelClose(e) {
            $log.error(e);
        };
        channel.onerror = function onError(e) {
            $log.error(e);
        };
    };
    
    
    var connect = function(options) {
       
       pc = new PeerConnection(iceServers, optional);
       
       pc.onicecandidate = function onIceCandidateReady(e) {
           
           if(e.candidate && options.hasOwnProperty('onIceReady')) {
               
               options.onIceReady(e.candidate);
           }
       };
       
       createHandler = options.onCreated;
       addDataChannel(options.channel, options.type);
    };
    
    var send = function(msg) {
        
        dataChannel.send(msg);
    };
    
    var addSDP = function(sdp) {
        sdp = new SessionDescription(sdp);
        pc.setRemoteDescription(sdp);
    };
    
    var addCandidate = function(candidate) {
        
        pc.addIceCandidate(new IceCandidate({
            sdpMLineIndex: candidate.sdpMLineIndex,
            candidate: candidate.candidate
        }));
    };
    
    return {
        connect: connect,
        send: send,
        addSDP: addSDP,
        addCandidate: addCandidate
    }
            
}]);