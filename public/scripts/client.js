console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp',  [ 'ui.bootstrap' ] );
//create a controller
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

  }; // end submitCharacter function
  }]); //end charInputController


myApp.controller('charDisplayController', [ '$scope', '$http', '$uibModal', function( $scope, $http,  $uibModal ){

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

$scope.editChar = function( index ) {
   index.id = index;
  $uibModal.open({
    templateUrl: 'views/editCharacter.html',
    controller: 'editPopupController',
    size:'sm',
    resolve: {
      index: function(){
      return index;
      } // end index
    } // end resolve
  }); // end $modal.open
}; // end editStoryCover

}]); //end charDisplayController

angular.module('myApp').controller('editPopupController',
function ($scope, $uibModalInstance, index) {

  // var arrayNum = $rootScope.storyArrayIndex;
  //
  // if ($scope.isNewOrEdit === 0) {
  //   $scope.tempTitle = $rootScope.tempNewStoryArray.story_title;
  //   $scope.tempDescription = $rootScope.tempNewStoryArray.story_description;
  //   $scope.tempCover = $rootScope.tempNewStoryArray.story_cover;
  //   $scope.changeCoverInfo = $rootScope.tempNewStoryArray;
  // } else {
  //   $scope.tempTitle = $rootScope.storyIndex.story_title;
  //   $scope.tempDescription = $rootScope.storyIndex.story_description;
  //   $scope.tempCover = $rootScope.storyIndex.story_cover;
  //   $scope.changeCoverInfo = $rootScope.storyIndex;
  // } // end else

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel
}); // end editPopupController
