atl.factory('util', function() {
    
    return {
    
        uuid: function() {
            return uuid.v4();
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