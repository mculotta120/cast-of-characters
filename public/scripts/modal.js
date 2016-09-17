console.log("modal sourced");


// angular.module('myApp').controller('ModalDemoCtrl', function ($uibModal, $log) {
//   var $ctrl = this;
//   $ctrl.items = ['item1', 'item2', 'item3'];
//
//   $ctrl.animationsEnabled = true;
//
//   $ctrl.open = function (size) {
//     var modalInstance = $uibModal.open({
//       animation: $ctrl.animationsEnabled,
//       ariaLabelledBy: 'modal-title',
//       ariaDescribedBy: 'modal-body',
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl',
//       controllerAs: '$ctrl',
//       size: size,
//       resolve: {
//         items: function () {
//           return $ctrl.items;
//         }
//       }
//     });
//
//     modalInstance.result.then(function (selectedItem) {
//       $ctrl.selected = selectedItem;
//     }, function () {
//       $log.info('Modal dismissed at: ' + new Date());
//     });
//   };
//
// });
//
// // Please note that $uibModalInstance represents a modal window (instance) dependency.
// // It is not the same as the $uibModal service used above.
//
// angular.module('myApp').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
//   var $ctrl = this;
//   $ctrl.items = items;
//   $ctrl.selected = {
//     item: $ctrl.items[0]
//   };
//
//   $ctrl.ok = function () {
//     $uibModalInstance.close($ctrl.selected.item);
//   };
//
//   $ctrl.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// });
//
// // Please note that the close and dismiss bindings are from $uibModalInstance.
//
// angular.module('myApp').component('modalComponent', {
//   templateUrl: 'myModalContent.html',
//   bindings: {
//     resolve: '<',
//     close: '&',
//     dismiss: '&'
//   },
//   controller: function () {
//     var $ctrl = this;
//
//     $ctrl.$onInit = function () {
//       $ctrl.items = $ctrl.resolve.items;
//       $ctrl.selected = {
//         item: $ctrl.items[0]
//       };
//     };
//
//     $ctrl.ok = function () {
//       $ctrl.close({$value: $ctrl.selected.item});
//     };
//
//     $ctrl.cancel = function () {
//       $ctrl.dismiss({$value: 'cancel'});
//     };
//   }
// });
