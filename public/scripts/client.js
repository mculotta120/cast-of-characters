console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp', ['ngRoute', 'ui.bootstrap' ]);
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

myApp.directive('modalDialog', function(  ) {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

myApp.controller('MyCtrl', ['$scope', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function( ) {
    $scope.modalShown = !$scope.modalShown;
  };
  $scope.openModal = function( ){
    console.log("openModal clicked");

  }; // end openModal


}]);
