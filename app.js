(function() {
  var app = angular.module('kanbAngular', []);

  app.directive("story", function(){
    return {
            restrict: 'E',
            templateUrl: "story.html"
    };
  });

  app.directive("task", function(){
    return {
            restrict: 'E',
            templateUrl: "task.html"
    };
  });

  /*app.controller('StoryController', function(){
    this.title = "ddddddd";
  });*/

})();