angular.module('admin.new', [
    'ngRoute'
  ])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/new', {
          templateUrl: 'src/new/new.html',
          controller: 'NewCtrl',
          controllerAs: 'new'
        })
    }])
  .controller('NewCtrl', NewCtrl);

function NewCtrl($routeParams, $location, GuestList) {
  this.loading = true;

  this.$location = $location;
  this.GuestList = GuestList;
  this.guestListId = $routeParams.guestListId;

  this.rsvpReceivedOptions = {
    'Yes': true,
    'No': false
  };
  this.goingOptions = {
    "Don't know": null,
    'Yes': true,
    'No': false
  };
  this.relations = [
    'OTHER',
    'FAMILY_ROY',
    'FAMILY_BONNIE',
    'FAMILY_IMMEDIATE',
    'FAMILY_DEBBIE',
    'FAMILY_CANDY',
    'FRIEND',
    'FAMILY_ART'
  ];

  this.guest = new GuestList();
}

NewCtrl.prototype.create = function () {
  this.guest.lastUpdatedBy = prompt('Enter your first name');

  this.loading = true;
  var vm = this;
  this.guest.$create(function (response) {
    console.log(response);
    vm.$location.path('/details/' + response.id);
  }, function () {
    vm.loading = false;
  })
};
