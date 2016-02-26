"use strict";
app.controller('AppController', ["$scope", "QuoteService", function($scope, QuoteService) {
  $scope.DevModeOn = false;
  $scope.QuoteService = QuoteService;
  $scope.CurrentHour = null;

  $scope.NextBackgroundImage = function(code) {
    $("#IntroHeader").removeClass("intro" + $scope.NextBackgroundImageCode);
    if (code != null) {
      if (code == 3.1) {
        code = 4;
      } else if (code > 3.2) {
        code = code + 1;
      }
      $scope.NextBackgroundImageCode = code;
    } else {
      if ($scope.NextBackgroundImageCode == null || $scope.NextBackgroundImageCode == 8) {
        $scope.NextBackgroundImageCode = 0;
      }
      $scope.NextBackgroundImageCode = $scope.NextBackgroundImageCode + 1;
    }
    $("#IntroHeader").addClass("intro" + $scope.NextBackgroundImageCode);
  };

  $scope.GoQuote = function() {
    if ($('body').scrollTop() != 0) {
      $('body').stop().animate({
        scrollTop: 0,
        overflow: "hidden"
      }, 1500, 'easeInOutExpo', function() {
        $scope.ShowQuote();
      });
    } else {
      $('body').css("overflow", "hidden");
      $scope.ShowQuote();
    }
  }

  $scope.FireAt = function(callback, time) {
    if ($scope.DevModeOn) {
      callback();
    } else {
      setTimeout(callback, time);
    }
  }

  $scope.ShowQuote = function() {
    clearInterval($scope.LoadingAnimationInterval);
    $("#IntroBox, .navbar").fadeOut();
    $("#QuoteBox").fadeIn();

    $scope.FireAt(function() {
      QuoteService.CurrentStep = 1;
      $scope.NextBackgroundImage(QuoteService.CurrentStep);
      $scope.$applyAsync();
      $scope.GoQuoteStep1();
    }, 100);
  }

  $scope.GoQuoteStep1 = function() {
    $scope.FireAt(function() {
      $("#QuoteStep1Hi").fadeIn();
    }, 1000);

    $scope.FireAt(function() {
      $("#QuoteStep1Welcome").fadeIn();
    }, 2500);

    $scope.FireAt(function() {
      $("#QuoteStep1Message").fadeIn();
    }, 5000);

    $scope.FireAt(function() {
      $(".QuoteStep1Form").fadeIn();
    }, 8500);
  }

  $scope.GoQuoteStep2 = function() {
    $("#QuoteStep1").fadeOut({
      done: function() {
        $scope.CurrentHour = new Date().getHours();
        QuoteService.CurrentStep = 2;
        $scope.NextBackgroundImage(QuoteService.CurrentStep);
        $scope.$applyAsync();
        $("#QuoteStep2Hi").fadeIn();

        $scope.FireAt(function() {
          $("#QuoteStep2Message").fadeIn();
        }, 1500);
      }
    });
  }

  $scope.GoQuoteStep3 = function() {
    $("#QuoteStep2").fadeOut({
      done: function() {
        QuoteService.CurrentStep = 3;
        $scope.NextBackgroundImage(QuoteService.CurrentStep);
        $scope.$applyAsync();
        $("#QuoteStep3Hi").fadeIn();

        $scope.FireAt(function() {
          $("#QuoteStep3Message").fadeIn();
        }, 1500);
      }
    });
  }

  $scope.GoQuoteStep3_1 = function() {
    $("#QuoteStep3").fadeOut({
      done: function() {
        QuoteService.CurrentStep = 3.1;
        $scope.NextBackgroundImage(QuoteService.CurrentStep);
        $scope.$applyAsync();
        $("#QuoteStep3_1Hi").fadeIn();

        $scope.FireAt(function() {
          $("#QuoteStep3_1Message").fadeIn();
        }, 1500);
      }
    });
  }

  $scope.GoQuoteStep4 = function() {
    $("#QuoteStep3_1").fadeOut({
      done: function() {
        QuoteService.CurrentStep = 4;
        $scope.NextBackgroundImage(QuoteService.CurrentStep);
        $scope.$applyAsync();
        $("#QuoteStep4Hi").fadeIn();

        $scope.FireAt(function() {
          $("#QuoteStep4Message").fadeIn();
        }, 1500);
      }
    });
  }

  $scope.GoQuoteStep5 = function() {
    $("#QuoteStep4").fadeOut({
      done: function() {
        QuoteService.CurrentStep = 5;
        $scope.NextBackgroundImage(QuoteService.CurrentStep);
        $scope.$applyAsync();
        $("#QuoteStep5Hi").fadeIn();

        $scope.FireAt(function() {
          $("#QuoteStep5Message").fadeIn();
        }, 1500);
      }
    });
  }

  $scope.GoQuoteStep6 = function() {
    $("#QuoteStep5").fadeOut({
      done: function() {
        QuoteService.CurrentStep = 6;
        $scope.NextBackgroundImage(QuoteService.CurrentStep);
        $scope.$applyAsync();
        $("#QuoteStep5Hi").fadeIn();

        $scope.FireAt(function() {
          $("#QuoteStep5Hi").fadeOut();
          $("#QuoteStep5Message").fadeIn();
        }, 1500);
      }
    });
  }

  $scope.Init = function() {
    //Set scroll bars
    //$("#LandingContainer, #DetailsPanelContent").perfectScrollbar();

    //set FirstImage
    $scope.LoadingAnimationInterval = setInterval(function() {
      $scope.NextBackgroundImage();
    }, 5000);

    //DEV ONLY
  };
  $scope.Init();

}]);
