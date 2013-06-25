atl.directive('atlPeerVideo', ['$log', 'rtc', function($log, rtc) {
    
    return {
            // restrict: 'E',
            replace: true,
            templateUrl: 'ui/peer.video.html',
            link: function(scope, elm, attrs) {
                
                var type = attrs['atlPeerVideoType'] || 'local';
                var video = elm.find('[data-skin-part="video"]');
                
                rtc.createStream().then(function(url){
                    
                    video.attr('src', url);
                    // video.play();
                });
            }
    }
}]);