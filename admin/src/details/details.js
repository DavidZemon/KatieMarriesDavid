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

  this.GuestList = GuestList;
  this.guestListId = $routeParams.guestListId;

  this.loadGuest();
}

DetailsCtrl.prototype.loadGuest = function () {
  var vm = this;
  this.guest = this.GuestList.get({
    id: this.guestListId
  }, function () {
    vm.loading = false;
  }, function () {
    "use strict";
    vm.loading = false;
  });
};

DetailsCtrl.prototype.save = function () {
  this.guest.lastUpdatedBy = prompt('Enter your first name');

  this.loading = true;
  var vm = this;
  this.guest.$save(function () {
    vm.loadGuest();
  }, function () {
    vm.loading = false;
  })
};
