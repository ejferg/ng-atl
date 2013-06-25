atl.directive('atlPlayBar', ['$parse', function($parse){
   
   return {
       
       templateUrl: 'ui/play.bar.html',
       link: function(scope, elem, attrs) {
           
           var btnClass = 'play-bar-btn-%s';
           var titleLabel = elem.find('[skin-part="titleLabel"]');
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
           
           scope.$watch('title', function onTitleChange(newValue){
               
               if(newValue) {
                   
                    titleLabel.text(newValue);
               }
               
           });
           
           scope.$watch('state', function onStateChange(newValue, oldValue){
               
               if(newValue && oldValue) {
                   
                   var oldClass = _.str.sprintf(btnClass, oldValue);
                   var newClass = _.str.sprintf(btnClass, newValue);
                   
                   playButton.removeClass(oldClass);
                   playButton.addClass(newClass);
               }
           });
       }
   }
}]);