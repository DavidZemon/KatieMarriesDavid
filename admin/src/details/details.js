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

function DetailsCtrl($routeParams) {
  this.loading = true;

  this.guestListId = $routeParams.guestListId;
}
