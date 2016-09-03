console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp', [] );
//create a controller
myApp.controller('charInputController', [ '$scope', '$http', function( $scope, $http ){
console.log("in charInputController");
  $scope.characters = [];

    $scope.submitCharacter = function() {
      // event.preventDefault();
      var objectToSend ={  // package inputs into object to send
        name: $scope.characterNameIn,  // reference these in questionnaire.html
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
$scope.getCharacters = function(){
  $http({  // sends object via POST
    method: 'GET',
    url: '/getChars',
  }).then(function( response ){
      console.log( response, "response" );
      $scope.characters = response.data;
  }); // end get call
};


}]);
