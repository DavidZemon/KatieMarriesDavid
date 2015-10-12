angular.module('admin', [
  'admin.services',
  'admin.filters',
  'admin.overview',
    'admin.details',
    'admin.new'
])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/overview'
        })
    }]);
