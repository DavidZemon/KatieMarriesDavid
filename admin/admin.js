angular.module('admin', [
  'ngRoute',
  'admin.services'
]);
angular.module('admin.services', [
  'ngResource',
  'admin.constants'
]);
angular.module('admin.constants', []);


function AdminCtrl($http, GuestList) {
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
  });

}

AdminCtrl.prototype.setSort = function (columnName) {
  if (this.sortType === columnName)
    this.sortReverse = !this.sortReverse;
  else {
    this.sortReverse = false;
    this.sortType = columnName;
  }
};

AdminCtrl.prototype.alert = function (guest) {
  console.log('You clicked guest #' + guest.guestListId);
};

AdminCtrl.prototype.clearFilter = function () {
  this.filter = {};
};

AdminCtrl.prototype.calculateStatistics = function (data) {
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
  })
};

function CapitalizeFilter() {
  return function (input, all) {
    if (!!input) {
      return input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
    } else
      return '';
  }
}

function GuestList($resource, SERVICE_URL) {
  return $resource(SERVICE_URL + '/guestList', {}, {
    'query': {
      method: 'GET',
      isArray: true,
      headers: {
        'Authorization': CryptoJS.MD5(new Date(1958, 7, 10).toJSON())
      }
    }
  })
}

angular.module('admin')
  .controller('AdminCtrl', AdminCtrl);
angular.module('admin')
  .filter('capitalize', CapitalizeFilter);
angular.module('admin.services')
  .factory('GuestList', GuestList);
angular.module('admin.constants')
//.constant('SERVICE_URL', 'http://localhost:8080/admin/server')
  .constant('SERVICE_URL', 'http://katiemarriesdavid.com:8080/admin/server')
;
