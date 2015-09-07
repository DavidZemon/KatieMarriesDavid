var adminApp = angular.module('admin', [])
  .controller('AdminCtrl', AdminCtrl);

function AdminCtrl() {
  this.message = 'Hello';
}
