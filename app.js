(function() {
  var app = angular.module('kanbAngular', []);

  app.controller("StoryController", function() {
    this.addStory = function() {
      this.stories.push(this.story);
      addToHistory(createReport("Add US" + this.story.id));
      clearStory();
    };

    this.removeStory = function(story) {
      addToHistory(createReport("Remove US" + story.id));
      this.stories.splice(this.stories.indexOf(story),1);
    };

    this.editStory = function(story) {
      story.edit = true;
    };

    this.saveStory = function(story) {
      addToHistory(createReport("Edit US" + story.id));
      story.edit = false;
    };

    var clearStory = function() {
      ctrl.story = {};
      ctrl.story.tasks = [];
      ctrl.edit = false;
      if(ctrl.stories.length !== 0) 
          ctrl.story.id = ctrl.stories[ctrl.stories.length - 1].id + 1;
      else
          ctrl.story.id = 1;
    };

    this.stories = stories;
    var ctrl = this;
    clearStory();
  });

  app.controller("TaskController", function() {
      this.addTask = function() {
        addToHistory(createReport("Add Task" + this.task.id));
        this.task.id = this.getTaskId();
        this.current_story.tasks.push(this.task);

        clearTask();
      };

      this.getTaskId = function(){
        if(this.current_story.tasks.length !== 0)
            return this.current_story.tasks[this.current_story.tasks.length - 1].id + 1;
        return 1;
      };

      var clearTask = function() {
        ctrl.task = {};
        ctrl.current_story = stories[0];
        ctrl.task.status = 0;
        ctrl.task.id = ctrl.getTaskId();
        ctrl.task.edit = false;
      };

      var ctrl = this;
      clearTask();
  });

  app.directive("storyDisplay", function(){
    return {
            restrict: 'E',
            templateUrl: "story-display.html"
    };
  });

  app.directive("storyForm", function(){
    return {
            restrict: 'E',
            templateUrl: "story-form.html"
    };
  });

  app.directive("tasksDisplay", function(){
    return {
            restrict: 'E',
            templateUrl: "tasks-display.html",
            controller: ['$scope', function($scope) {
                this.colunm = $scope.colunm;
                this.tasks = $scope.tasks;

                this.moveToRight = function(task) {
                  if(task.status !== 2){
                    task.status++;
                    if(task.status === 1){
                      addToHistory(createReport("Doing task " + task.id));
                    }else{
                      addToHistory(createReport("Done task " + task.id));
                    }
                  }
                };

                this.moveToLeft = function(task) {
                  if(task.status !== 0){
                    task.status--;
                    if(task.status === 0){
                      addToHistory(createReport("Task " + task.id + " moved from Doing to To Do"));
                    }else{
                      addToHistory(createReport("Task " + task.id + " moved from Done to Doing"));
                    }
                  }
                };

                this.editTask = function(task) {
                  task.edit = true;
                };

                this.saveTask = function(task) {
                  addToHistory(createReport("Edit task " + task.id)); 
                  task.edit = false;
                };

                this.removeTask = function(task) {
                  addToHistory(createReport("Remove task " + task.id));
                  this.tasks.splice(this.tasks.indexOf(task),1);
                };

                this.isInTheColunm = function(task) {
                  return task.status === this.colunm;
                };
            }],
            controllerAs: "tasksDisplayCtrl",
            scope: {
              colunm: "=",
              tasks: "=",
            },
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
            templateUrl: "history.html",
            controller: function(){
              this.history = history;
            },
            controllerAs: "historyCtrl",
    };
  });

  var history = [];

  var createReport = function(message){
    return {
      msg: message, 
      time: Date.now()
    };
  };

  var addToHistory = function(report){
    history.push(report);
  };

  var stories = [{
      id: 1,
      as: "a user",
      iWant: "to do my homework",
      to: "pass in DAS",
      edit: false,
      tasks: [
      {
          id: 1,
          description: "First",
          status: 0,
          edit: false,
      },
      {
          id: 2,
          description: "Second",
          status: 1,
          edit: false,
      }]
    },
    {
      id: 2,
      as: "a user",
      iWant: "to do my homework",
      to: "pass in DAS",
      edit: false,
      tasks: [
      {
          id: 1,
          description: "First From Second Story",
          status: 2,
          edit: false,

      }]
    }];

})();
