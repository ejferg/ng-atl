atl.directive('atlPeerVideo', 
    ['$log', '$document', 'rtc', 'util', 
    function($log, rtc, util) {
    
    return {
            scope: {
                id: '@atlPeerVideo',
                url: '@atlPeerVideoUrl'
            },
            replace: true,
            templateUrl: 'ui/peer.video.html',
            link: function(scope, elem, attrs) {
                
                var isMuted = true;
                var type = attrs['atlPeerVideoType'];
                var video = elem.find('[skin-part="video"]');
                
                scope.$watch('url', function onUrlChanged(newValue, oldValue) {
                    
                    if(newValue) {
                        
                        video.attr('src', scope.url);
                    }
                });
                
                scope.$watch('id', function onUrlChanged(newValue, oldValue) {
                    
                    if(angular.isDefined(newValue) && (newValue != oldValue)) {
                        
                        video.attr('id', scope.id);
                    }
                });
            }
    }
}]);