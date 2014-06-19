(function() {
  var app = angular.module('kanbAngular', []);

  app.controller("StoryController", function() {
    this.stories = stories;

    this.addStory = function() {

    };
  });

    app.controller("TaskController", function() {
      this.task = {};

    this.addTasks = function(story) {
      story.tasks.push(this.task);

      this.task = {};
    };

  });

  app.directive("story", function(){
    return {
            restrict: 'E',
            templateUrl: "story.html"
    };
  });

  app.directive("storyForm", function(){
    return {
            restrict: 'E',
            templateUrl: "story-form.html"
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

  var stories = [{
      id: 1,
      as: "a user",
      iWant: "to do my homework",
      to: "pass in DAS",
      tasks: []
    },
    {
      id: 2,
      as: "a user",
      iWant: "to do my homework",
      to: "pass in DAS",
      tasks: []
    }];

})();