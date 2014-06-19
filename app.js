(function() {
  var app = angular.module('kanbAngular', []);
  app.directive("story", function(){
    return {
            restrict: 'E',
            templateUrl: "story.html"
    };
  });

})();