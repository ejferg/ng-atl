atl.directive('atlPeerVideo', ['$log', 'rtc', function($log, rtc) {
    
    return {
            scope: {
                id: '@atlPeerVideo',
                type:'@atlPeerVideoType',
                url: '@atlPeerVideoUrl'
            },
            replace: true,
            templateUrl: 'ui/peer.video.html',
            link: function(scope, elm, attrs) {
                
                var video = elm.find('[data-skin-part="video"]');
                
                scope.$watch('url', function onUrlChanged(newValue, oldValue){
                    
                    if(angular.isDefined(newValue) && (newValue != oldValue)) {
                        
                        video.attr('src', scope.url);
                    }
                });
                
                scope.$watch('id', function onUrlChanged(newValue, oldValue){
                    
                    if(angular.isDefined(newValue) && (newValue != oldValue)) {
                        
                        video.attr('id', scope.id);
                    }
                });
            }
    }
}]);