atl.controller('PlayBarController', 
    ['$rootScope', '$scope', '$log', 
    function($rootScope, $scope, $log) {
        
        $scope.togglePlay = function() {
            
            $log.log('togglePlay');
        };
        
        $scope.skip = function() {
            
            $log.log('skip');
        };
    
}]);