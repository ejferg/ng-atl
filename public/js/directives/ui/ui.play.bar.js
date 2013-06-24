atl.directive('atlPlayBar', ['$parse', function($parse){
   
   return {
       
       templateUrl: 'ui/play.bar.html',
       link: function(scope, elem, attrs) {
           
           var playButton = elem.find('[skin-part="playButton"]');
           var skipButton = elem.find('[skin-part="skipButton"]');
           
           var playClickHandler = $parse(attrs['atlPlayBarOnPlay']);
           var skipClickHandler = $parse(attrs['atlPlayBarOnSkip']);
           
           skipButton.bind('click', function onSkipButonClick(e){
               
               if(skipClickHandler) {
                   
                   skipClickHandler(scope);
               }
           });
           
           playButton.bind('click', function onPlayButonClick(e){
               
               if(playClickHandler) {
                   
                   playClickHandler(scope);
               }
           });
           
           scope.$watch('state', function onStateChange(value){
               
           });
       }
   }
}]);