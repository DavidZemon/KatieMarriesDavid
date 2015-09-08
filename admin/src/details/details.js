angular.module('admin.details', [
  'ngRoute'
])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/details/:guestListId', {
          templateUrl: 'src/details/details.html',
          controller: 'DetailsCtrl',
          controllerAs: 'details'
        })
    }])
  .controller('DetailsCtrl', DetailsCtrl);

function DetailsCtrl($routeParams, GuestList) {
  this.loading = true;

  this.guestListId = $routeParams.guestListId;

  var vm = this;
  this.guest = GuestList.get({
    id: this.guestListId
  }, function () {
    vm.loading = false;
  }, function () {
    "use strict";
    vm.loading = false;
  });
}
