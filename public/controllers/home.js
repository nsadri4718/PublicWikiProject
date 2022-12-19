wikiApp.controller("homeController", function($scope, $http) {
  // Controller for home view

  // event handler for the search button
  // $http.get() to your search endpoint
  // the result will be an array of objects, assign this to a scope var
  // $scope.searchResults = ...
  $scope.search = function(searchTerm) {
    
    var searchEndpoint = "/api/wiki/search/" + searchTerm;
    
    $http.get(searchEndpoint)
    .then(function(response){
      $scope.searchResults = response.data;
    })
    .catch(function(err) {
      alert(err.data);
    });
    
  }

});