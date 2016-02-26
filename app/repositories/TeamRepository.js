
app.service('TeamRepository', ["RequestService", function(RequestService) {
  this.persons;

  this.CreateTeam = function(personsData, teamData, then) {
    logClient.SendLog({
      level:'DEBUG',
      category : "information",
      message :"team add route from Middleware called"
    });

    var data = {
      teamData: teamData,
      personsData: personsData
    };

    console.log(data);

    var onComplete = then;
    RequestService.GetFalcorModel().
    call("team.add", [data]).
    then(function(value) {
      onComplete(value.json);
    }).catch(function(err){
      console.log(err);
      logClient.SendLog({
        level:'ERROR',
        category : "information",
        message :"team add route from Middleware called error: " + err.message
      });
      onComplete(-1);
    });
  }

}]);
