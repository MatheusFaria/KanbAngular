(function() {
  var app = angular.module('kanbAngular', []);

  app.controller("StoryController", function() {
    this.stories = stories;
    this.story = {};
    this.story.id = this.stories.length+1;

    this.addStory = function() {
      this.stories.push(this.story);
      this.story = {};
      this.story.id = this.stories.length+1;
    };
  });

  app.controller("TaskController", function() {
      this.task = {};
      this.current_story = 0;

      this.addTasks = function() {
        stories[this.current_story - 1].tasks.push(this.task);
        this.task = {};
        this.current_story = 0;
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

  app.directive("taskTodo", function(){
    return {
            restrict: 'E',
            templateUrl: "task-todo.html"
    };
  });

  app.directive("taskDoing", function(){
    return {
            restrict: 'E',
            templateUrl: "task-doing.html"
    };
  });

  app.directive("taskDone", function(){
    return {
            restrict: 'E',
            templateUrl: "task-done.html"
    };
  });

  app.directive("formTabs", function(){
    return {
            restrict: 'E',
            templateUrl: "form-tabs.html",
              
            controller: function() {
              this.tab = 2;
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
      tasks: [
      {
          id: 1,
          description: "First",
          status: 0
      },
      {
          id: 2,
          description: "Second",
          status: 1
      }]
    },
    {
      id: 2,
      as: "a user",
      iWant: "to do my homework",
      to: "pass in DAS",
      tasks: [
      {
          id: 1,
          description: "First From Second Story",
          status: 2

      }]
    }];

})();