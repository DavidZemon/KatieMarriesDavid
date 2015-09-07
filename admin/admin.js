angular.module('admin', [
  'ngRoute',
  'admin.services'
]);
angular.module('admin.services', [
  'ngResource'
]);


function AdminCtrl(GuestList) {
  this.sortType = 'attendingFor';
  this.sortReverse = false;

  this.filter = {};

  this.guests = GuestList.query();

  this.davidsGuestsInvited = 50;
  this.katiesGuestsInvited = 50;
  this.davidsGuestsAttending = 50;
  this.katiesGuestsAttending = 50;
  this.rsvpsReceived = 1;
  this.rsvpsNotReceived = 99;
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

function GuestList($resource) {
  return $resource('http://katiemarriesdavid.com:8080/admin/server/guestList')
}

angular.module('admin')
  .controller('AdminCtrl', AdminCtrl);
angular.module('admin')
  .filter('capitalize', CapitalizeFilter);
angular.module('admin.services')
  .factory('GuestList', GuestList);
