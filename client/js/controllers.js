todoApp.controller('TodoCtrl', function($rootScope, $scope, todosFactory) {

  $scope.todos = [];
  $scope.isEditable = [];

  // get all Todos on Load
  todosFactory.getTodos().then(function(data) {
    $scope.todos = data.data;
  });

  // Save a Todo to the server
  $scope.save = function($event) {
    if ($event.which == 13 && $scope.todoInput) {

      todosFactory.saveTodo({
        "todo": $scope.todoInput,
        "isCompleted": false
      }).then(function(data) {
        $scope.todos.push(data.data);
      });
      $scope.todoInput = '';
    }
  };

  // Delete a Todo
  $scope.delete = function(i) {
    todosFactory.deleteTodo($scope.todos[i]._id).then(function(data) {
      if (data.data) {
        $scope.todos.splice(i, 1);
      }
    });
  };

});
