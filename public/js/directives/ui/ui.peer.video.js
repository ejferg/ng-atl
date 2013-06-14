atl.directive('atlPeerVideo', ['$log', 'rtc', function($log, rtc) {
    
    return {
            restrict: 'E',
            replace: true,
            templateUrl: 'ui/peer.video.html',
            link: function(scope, elm, attrs) {
                
                var options = {video: true, audio: true};
                
                var localVideo = elm.find('[data-skin-part="localVideo"]');
                var remoteVideo = elm.find('[data-skin-part="remoteVideo"]');
                
                rtc.addStream('local', options)
                    .then(
                        function onSuccess(data) {
                            localVideo.attr('src', data.url);
                        },
                        function onError(err) {
                            
                            $log.error(err);
                        }
                    );
            }
    }
}]);