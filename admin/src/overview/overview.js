angular.module('admin.overview', [
  'ngRoute'
])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/overview', {
          templateUrl: 'src/overview/overview.html',
          controller: 'OverviewCtrl',
          controllerAs: 'overview'
        })
    }])
  .controller('OverviewCtrl', OverviewCtrl);

function OverviewCtrl($location, GuestList) {
  this.loading = true;
  this.$location = $location;

  this.sortType = 'attendingFor';
  this.sortReverse = false;

  this.clearFilter();

  this.davidsGuestsInvited = 0;
  this.katiesGuestsInvited = 0;
  this.davidsGuestsAttending = 0;
  this.katiesGuestsAttending = 0;
  this.rsvpsReceived = 0;
  this.rsvpsNotReceived = 0;

  var vm = this;
  this.guests = GuestList.query(function (data) {
    vm.calculateStatistics(data);
    vm.loading = false;
  }, function () {
    vm.loading = false;
  });
}

OverviewCtrl.prototype.setSort = function (columnName) {
  if (this.sortType === columnName)
    this.sortReverse = !this.sortReverse;
  else {
    this.sortReverse = false;
    this.sortType = columnName;
  }
};

OverviewCtrl.prototype.go = function (guest) {
  this.$location.path('/details/' + guest.guestListId);
};

OverviewCtrl.prototype.goNew = function () {
  this.$location.path('/new');
};

OverviewCtrl.prototype.clearFilter = function () {
  this.filter = {};
};

OverviewCtrl.prototype.calculateStatistics = function (data) {
  var vm = this;
  data.forEach(function (guest) {
    if ('DAVID' === guest.attendingFor) {
      vm.davidsGuestsInvited += guest.count;
      if (guest.going) {
        vm.davidsGuestsAttending += guest.count;
      }
    } else {
      vm.katiesGuestsInvited += guest.count;
      if (guest.going) {
        vm.katiesGuestsAttending += guest.count;
      }
    }
    if (guest.rsvpReceived)
      vm.rsvpsReceived += 1;
    else
      vm.rsvpsNotReceived += 1;
  });
  this.rsvpReceiveRatio = this.rsvpsReceived / (this.rsvpsReceived + this.rsvpsNotReceived );
};
