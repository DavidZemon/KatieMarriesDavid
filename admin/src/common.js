/***************
 *** Filters ***
 ***************/
angular.module('admin.filters', [])
  .filter('capitalize', CapitalizeFilter);
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

/*****************
 *** Constants ***
 *****************/
angular.module('admin.constants', [])
//.constant('SERVICE_URL', 'http://localhost:8080/admin/server')
  .constant('SERVICE_URL', 'http://katiemarriesdavid.com:8080/admin/server')
;

/****************
 *** Services ***
 ****************/
angular.module('admin.services', [
  'ngResource',
  'admin.constants'
])
  .factory('GuestList', GuestList);
function GuestList($resource, SERVICE_URL) {
  return $resource(SERVICE_URL + '/guestList/:id', {
    id: '@id'
  }, {
    'query': {
      method: 'GET',
      isArray: true,
      headers: {
        'Authorization': CryptoJS.MD5(new Date(1958, 7, 10).toJSON())
      }
    },
    'get': {
      method: 'GET',
      headers: {
        'Authorization': CryptoJS.MD5(new Date(1958, 7, 10).toJSON())
      }
    },
    'save': {
      method: 'POST',
      headers: {
        'Authorization': CryptoJS.MD5(new Date(1958, 7, 10).toJSON())
      }
    }
  })
}
