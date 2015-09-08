angular.module('admin', [
  'admin.services',
  'admin.filters',
  'admin.overview'
])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/overview'
        })
    }]);
