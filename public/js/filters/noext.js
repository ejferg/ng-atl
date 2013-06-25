atl.filter('noext', ['util', function(util) {
    
  return function(name) {
    
    name = name.split('.')[0] || 'Untitled';
    
    return name;
  };
}]);