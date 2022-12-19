wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {
  // Controller for display view

  // Notes:
  // Make an GET ajax call to endpoint and pass in the urlName
  // The result will contain the html that should get assigned to $scope.html
  // $scope.title = response.data.title
  // $scope.html = response.data.html

  $scope.urlName = $routeParams.urlName;
  
  var wikiEndpoint = "/api/wiki/" + $scope.urlName;
  
  $http.get(wikiEndpoint)
  .then(function(response) {
    $scope.title = response.data.title;
    $scope.category = response.data.category;
    $scope.author = response.data.author;
    $scope.html = response.data.html;
    $scope.pageViews = response.data.pageViews;
    $scope.createdDate = response.data.createdDate;
    $scope.updatedDate = response.data.updatedDate;
  })
  .catch(function(err) {
    alert(err.data);
  });
  
});