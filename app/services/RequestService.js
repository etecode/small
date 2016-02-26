"use strict";
//RequestService
//Handles HTTP requests to a Server
app.service('RequestService', ["$http", function($http) {

  this.GetFalcorModel = function(authToken) {
    if(authToken){
        var headers = {
            Authorization : 'Bearer ' + authToken
        };
    }

    if (this.model == null) {
        this.model = new falcor.Model({source: new falcor.HttpDataSource(configurations.FalcorRouterConfigs.host + ":" + configurations.FalcorRouterConfigs.port + '/model.json', {

            crossDomain: true
        })});

    }
console.log(this.model);
    return this.model;
  }

  //Request Data Async
  this.RequestAsync = function(requestMethod, address, data, handler, successCallback, errorCallback) {
    //Write Request
    var req = {
      method: requestMethod.toUpperCase(),
      url: address,
      data: (data != null) ? data : null
    };

    //Make Request
    $http(req).success(function(data, status, headers, config) {
      //Success
      successCallback(handler, data);
    }).error(function(data, status, headers, config) {
      //Error
      errorCallback(handler, data);
    });
  };

}]);
