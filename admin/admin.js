angular.module('admin', [
  'ngRoute',
  'admin.services'
]);
angular.module('admin.services', [
  'ngResource'
]);


function AdminCtrl(GuestList) {
  this.guests = GuestList.query();

  this.davidsGuests = 50;
}

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
  return $resource('http://localhost:8080/KatieMarriesDavid/client/admin/server/guestList')
}

angular.module('admin')
  .controller('AdminCtrl', AdminCtrl);
angular.module('admin')
  .filter('capitalize', CapitalizeFilter);
angular.module('admin.services')
  .factory('GuestList', GuestList);
