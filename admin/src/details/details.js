angular.module('admin.details', [
  'ngRoute'
])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/details', {
          templateUrl: 'src/details/details.html',
          controller: 'DetailsCtrl',
          controllerAs: 'details'
        })
    }])
  .controller('DetailsCtrl', DetailsCtrl);

function DetailsCtrl() {
  this.message = "Hello, world!";
}
