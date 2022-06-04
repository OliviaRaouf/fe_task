import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import filterComponent from '../../components/vue-components/filter-component.vue';

angular
  .module('appModule')
  .controller('homeController', homePageController)
  .directive('filterComponent', createVueComponent => {
    return createVueComponent(Vue.component('filterComponent', filterComponent));
  });

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.employees = [];

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
  handleHelloEvent();
  function handleHelloEvent(greetings) {
    // console.log($scope);
    // this.handleHelloEvent = function (greetings) {
      console.log(greetings); // "Hello, World!"
    // };
  }
}
