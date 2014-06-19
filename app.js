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

  app.directive("formTabs", function(){
    return {
            restrict: 'E',
            templateUrl: "form-tabs.html",
              
            controller: function() {
              this.tab = 3;
              this.isSet = function(checkTab) {
                return this.tab === checkTab;
              };

              this.setTab = function(activeTab) {
                this.tab = activeTab;
              };  
              
            },
            controllerAs: "tab"
    };
  });

  app.directive("storyForm", function(){
    return {
            restrict: 'E',
            templateUrl: "story-form.html"
    };
  });

  app.directive("taskForm", function(){
    return {
            restrict: 'E',
            templateUrl: "task-form.html"
    };
  });

  app.directive("history", function(){
    return {
            restrict: 'E',
            templateUrl: "history.html"
    };
  });

  /*app.controller('StoryController', function(){
    this.title = "ddddddd";
  });*/

})();