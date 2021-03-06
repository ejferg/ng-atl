atl.factory('util', function() {
    
    return {
    
        uuid: function() {
            return uuid.v4();
        },
        toggleMute: function(stream, muted) {
            
            if (muted) {

              for (i = 0; i < stream.audioTracks.length; i++) {
                stream.audioTracks[i].enabled = true;
              }
            } else {
              for (i = 0; i < stream.audioTracks.length; i++){
                stream.audioTracks[i].enabled = false;
              }
            }
        },
        noExtenstion: function(name) {
            
            var name = name.split('.')[0] || 'Untitled';
            return name;
        },
        toMultiPartSDP: function(sdp) {
            
                sdp = JSON.stringify(sdp);
                var part = parseInt(sdp.length / 3);
    
                var firstPart = sdp.slice(0, part);
                var secondPart = sdp.slice(part, sdp.length - 1);
                var thirdPart = '';
    
                if (sdp.length > part + part) {
                    secondPart = sdp.slice(part, part + part);
                    thirdPart = sdp.slice(part + part, sdp.length);
                }
                
                return [ 
                        {name: 'firstPart', value: firstPart},
                        {name: 'secondPart', value: secondPart},
                        {name: 'thirdPart', value: thirdPart}
                    ];
        }
    };
});