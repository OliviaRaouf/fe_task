angular.module('appModule')
  .config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function ($locationProvider, $urlRouterProvider, $stateProvider) {
    $locationProvider.html5Mode({
      enabled: true,
    });
    $urlRouterProvider.otherwise('/app');
    // $urlRouterProvider.when('', '/');
    $stateProvider
      .state({
        name: 'app',
        url: '/',
        templateUrl: './pages/home-page/home-page.html',
        controller: 'homeController',
        controllerAs: 'homePageVm',
      })
      .state({
        name: 'team-performance',
        url: '/team-performance',
        template: '<v-performance-page></v-performance-page>',
      })
      .state({
        name: 'not-found-page',
        url: '/not-found-page',
        template: '<v-page-not-found></v-page-not-found>',
      });
  }]);
