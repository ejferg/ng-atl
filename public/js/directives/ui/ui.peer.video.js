atl.directive('atlPeerVideo', ['$log', '$document', 'rtc', function($log, rtc) {
    
    return {
            scope: {
                id: '@atlPeerVideo',
                url: '@atlPeerVideoUrl'
            },
            replace: true,
            templateUrl: 'ui/peer.video.html',
            link: function(scope, elem, attrs) {
                
                var type = attrs['atlPeerVideoType'];
                var video = elem.find('[data-skin-part="video"]');
                
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