atl.filter('noext', function() {
    
  return function(name) {
    
    name = name.split('.')[0] || 'Untitled';
    
    return name;
  };
});