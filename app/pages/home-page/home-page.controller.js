import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import filterComponent from '../../components/vue-components/filter-component.vue';

var app = angular
  .module('appModule')
  .controller('homeController', homePageController)
  .directive('filterComponent', createVueComponent => {
    return createVueComponent(Vue.component('filterComponent', filterComponent));
  });

function homePageController(Employees, $scope, $location) {
  const homePageVm = this;
  homePageVm.employees = [];

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        $scope.data = homePageVm.employees;
        if ($location.$$search.filter) {
          $scope.filter = $location.$$search.filter;
        }
      });
    homePageVm.handleFilterEvent = function (filterData) {
      $scope.filter = filterData;
      if (filterData !== null || filterData !== undefined || filterData !== '') {
        $location.search({ filter: $scope.filter });
      }
      $location.replace();
    };
  }
}

app.filter('highlightWord', function ($sce) {
  return function (text, filter) {
    if (filter) {
      text = text.replace(
        new RegExp('(' + filter + ')', 'gi'),
        '<span class="highlight">$1</span>'
      );
    }
    return $sce.trustAsHtml(text);
  };
});
