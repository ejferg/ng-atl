atl.directive('atlPeerVideoView', ['$log', 'rtc', function($log, rtc) {
        
        return {
            
            templateUrl: 'views/peer.video.view.html',
            link: function(scope, elem, attrs) {
                
                // elem.isotope({
                //       itemSelector: '.peer-video',
                //       masonry: {
                //         columnWidth: 340,
                //         cornerStampSelector: '.local'
                //       }
                // });
                
                // scope.$watch('streams', function onStreamsChange(){
                    
                //     elem.isotope( 'reLayout');
                // });
            }
        }
}]);