console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngSanitize' ]);
//create a controller
myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
      when("/home", {
          templateUrl: "/views/routes/home.html"
      }).
      when("/addCharacter", {
        templateUrl: "/views/routes/addCharacter.html",
        controller: "charInputController"
      }).
      when("/characterList", {
        templateUrl: "/views/routes/characterList.html",
        controller: "charDisplayController"
      }).
      otherwise({
        redirectTo: "/home"
      });
}]);

myApp.controller('charInputController', [ '$scope', '$http',  function( $scope, $http){
console.log("in charInputController");
  $scope.characters = [];

    $scope.submitCharacter = function() {
      // event.preventDefault();
      var objectToSend ={  // package inputs into object to send
        name: $scope.characterNameIn,
        sketch: $scope.characterSketchIn,
        affiliations: $scope.affiliationsIn,
        issues: $scope.issuesIn,
        bio: $scope.characterBioIn
        }; // end object
      $http({  // sends object via POST
        method: 'POST',
        url: '/sendToDb',
        data: objectToSend
      }); // end post call
      console.log(objectToSend, "object");

      $scope.characterNameIn = '';
      $scope.characterSketchIn = '';
      $scope.affiliationsIn = '';
      $scope.issuesIn = '';
      $scope.characterBioIn = '';
  }; // end submitCharacter function
  }]); //end charInputController


myApp.controller('charDisplayController', [ '$scope', '$http',  function( $scope, $http ){

$scope.getCharacters = function(){
  $http({  // sends object via POST
    method: 'GET',
    url: '/getChars',
  }).then(function( response ){
      console.log( response, "response" );
      $scope.characters = response.data;
  }); // end then
}; //end get

$scope.deleteCharacter = function( character ){
  var objectToDelete = {
    id: character.id
  };
  console.log(objectToDelete, "character to delete");
  $http({  // sends object via POST
    method: 'POST',
    url: '/deleteChar',
    data: objectToDelete,
    success: function(){
      console.log("success");
      $scope.getCharacters();
    } //end success
  }); //end delete
}; //end deleteCharacter

$scope.editChar = function( character ) {
console.log("editChar index", character);
// $scope.editCharNameIn = $scope.character.name;
var objectToEdit ={  // package inputs into object to send
  id: character.id,
  newName: character.name,
  newSketch: character.sketch,
  newAffiliations: character.affiliations,
  newIssues: character.issues,
  newBio: character.bio
  }; // end object
$http({  // sends object via POST
  method: 'POST',
  url: '/edit',
  data: objectToEdit
}); // end post call
console.log(objectToEdit, "object");
}; // end editChar

}]); //end charDisplayController

angular.module('myApp').controller('ModalDemoCtrl', function ($uibModal, $log) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('myApp').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


});
