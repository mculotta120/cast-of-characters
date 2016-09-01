console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp', [] );
//create a controller
myApp.controller('sampleController', [ '$scope', function( $scope ){
  $scope.outsideArray = [];
  $scope.checkInput = function(){

    var input1 = $scope.sampleBinder;
    var input2 = $scope.sampleBinder2;

    console.log('input gathered: ' + input1 + " " + input2 );

    var objectToSend = {
      "first": input1,
      "second": input2
    };

    $scope.outsideArray.push(objectToSend);

    console.log("objectToSend : " + objectToSend );

  }; //end check input function
}]);
