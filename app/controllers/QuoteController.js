"use strict";
app.controller('QuoteController', ["$scope", "QuoteService", function($scope, QuoteService) {
  $scope.QuoteService = QuoteService;

  $scope.Init = function() {};

}]);
