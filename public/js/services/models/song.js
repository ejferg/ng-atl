atl.factory('Song', 
    ['$resource', '$q', 'config', 
    function($resource, $q, config) {
    
    	var url = config.serviceUrl + '/songs/:id';
		var service = $resource(url, {id:'@id'});

		var get = function(params) {

			var d = $q.defer();

			service.get(params, function(result) {
				return d.resolve(result.data);
			});

			return d.promise;
		};

		return {
			get: get
		}
    
}]);