import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import PageNotFound from './pages/not-found-page.vue';
import store from './store/index';

angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
]);

angular.module('appModule').directive('vPerformancePage', (createVueComponent) => {
  return createVueComponent(Vue.component('performancePageComponent', PerformancePageComponent));
});

angular.module('appModule').directive('vPerformanceChart', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceChartComponent', PerformanceChartComponent));
});

angular.module('appModule').directive('vPageNotFound', (createVueComponent) => {
  return createVueComponent(Vue.component('pageNotFound', PageNotFound));
});

angular.module('appModule').config(($ngVueProvider) => {
  $ngVueProvider.setRootVueInstanceProps({
    store: store,
  });
});
