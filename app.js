(function() {
  var app = angular.module('kanbAngular', []);

  app.controller("StoryController", function() {
    this.stories = stories;
  });

  app.directive("storyDisplay", function(){
    return {
            restrict: 'E',
            templateUrl: "story-display.html",
            scope: {
                story: "=",
            },
            controller: ["$scope", function($scope) {
                this.story = $scope.story;
                this.stories = stories;

                this.remove = function(story) {
                  addToHistory(createReport("Remove US" + story.id));
                  this.stories.splice(this.stories.indexOf(story),1);
                };

                this.edit = function(story) {
                  story.edit = true;
                };

                this.save = function(story) {
                  addToHistory(createReport("Edit US" + story.id));
                  story.edit = false;
                };
            }],
            controllerAs: "storyDisplayCtrl",
    };
  });

  app.directive("storyForm", function(){
    return {
            restrict: 'E',
            templateUrl: "story-form.html",
            controller: function() {
                this.addStory = function() {
                  this.stories.push(this.story);
                  addToHistory(createReport("Add US" + this.story.id));
                  clearStory();
                };

                var clearStory = function() {
                  ctrl.story = {};
                  ctrl.story.tasks = [];
                  ctrl.story.edit = false;
                  ctrl.story.tasksCount = 0;
                  if(ctrl.stories.length !== 0) 
                      ctrl.story.id = ctrl.stories[ctrl.stories.length - 1].id + 1;
                  else
                      ctrl.story.id = 1;
                };

                this.stories = stories;
                var ctrl = this;
                clearStory();
            },
            controllerAs: "storyFormCtrl",
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
                      addToHistory(createReport("Doing task US" + task.parentId + "-T" + task.id));
                    }else{
                      addToHistory(createReport("Done task US" + task.parentId + "-T" + task.id));
                    }
                  }
                };

                this.moveToLeft = function(task) {
                  if(task.status !== 0){
                    task.status--;
                    if(task.status === 0){
                      addToHistory(createReport("Task US" + task.parentId + "-T" + task.id + " moved from Doing to To Do"));
                    }else{
                      addToHistory(createReport("Task US" + task.parentId + "-T" + task.id + " moved from Done to Doing"));
                    }
                  }
                };

                this.editTask = function(task) {
                  task.edit = true;
                };

                this.saveTask = function(task) {
                  addToHistory(createReport("Edit task US" + task.parentId + "-T" + task.id)); 
                  task.edit = false;
                };

                this.removeTask = function(task) {
                  addToHistory(createReport("Remove task US" + task.parentId + "-T" + task.id));
                  this.tasks.splice(this.tasks.indexOf(task),1);
                };

                this.isInTheColunm = function(task) {
                  return task.status === this.colunm;
                };

                this.moveButtonEnable = function(task, type){
                    if(type === 'left' && task.status === 0)
                        return true;
                    if(type === 'right' && task.status === 2)
                        return true;
                    return false;
                }
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
              this.tab = 1;
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
            templateUrl: "task-form.html",

            controller: function() {
              this.addTask = function() {
                this.task.parentId = this.current_story.id;
                this.task.id = this.getTaskId();
                this.current_story.tasks.push(this.task);
                this.current_story.tasksCount++;

                addToHistory(createReport("Add Task " + this.task.id + " to US" + this.task.parentId));
                clearTask();
              };

              this.getTaskId = function(){
                if(!this.shouldShow())
                    return 1;
                return this.current_story.tasksCount + 1;
              };

              this.getCurrentStoryId = function() {
                if(!this.shouldShow())
                    return;
                return this.current_story.id;
              };

              this.shouldShow = function() {
                return stories.length > 0;
              };

              this.currentStoryRefresh = function() {
                if(!this.shouldShow())
                    return;
                if(stories.indexOf(this.current_story) == -1)
                {
                    this.current_story = stories[0];
                }
              };

              var clearTask = function() {
                ctrl.task = {};
                ctrl.current_story = {};
                if(stories.length > 0)
                  ctrl.current_story = stories[0];
                ctrl.task.status = 0;
                ctrl.task.id = ctrl.getTaskId();
                ctrl.task.edit = false;
              };

              var ctrl = this;
              clearTask();
          },

          controllerAs: 'taskFormCtrl',
    };
  });

  app.directive("history", function(){
    return {
            restrict: 'E',
            templateUrl: "history.html",
            controller: function(){
              this.history = history;

              this.shouldShowHistory = function(){
                return this.history.length > 0;
              };
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
      iWant: "to register a story",
      to: "keep track of my features",
      edit: false,
      tasksCount: 2,
      tasks: [
      {
          id: 1,
          parentId: 1,
          description: "Create story model",
          status: 0,
          edit: false,
      },
      {
          id: 2,
          parentId: 1,
          description: "Create story controller",
          status: 1,
          edit: false,
      }]
    },
    {
      id: 2,
      as: "a user",
      iWant: "to register tasks for stories",
      to: "keep track of my activities",
      edit: false,
      tasksCount: 1,
      tasks: [
      {
          id: 1,
          parentId: 2,
          description: "Create task model",
          status: 2,
          edit: false,

      }]
    }];

})();
