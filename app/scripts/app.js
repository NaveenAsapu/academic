'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular.module('Authentication', []);
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
        'Authentication',
    'ui.router',
        "ngCookies",
    'ui.bootstrap',
    'angular-loading-bar',
    'ngFileUpload'
  ]).run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                console.log('fsdfsd',$location.path());
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    if($location.path() == '/signup'){
                        $location.path('/signup');
                    }else{
                        $location.path('/login');
                    }

                }
            });
        }])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'app/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'app/scripts/directives/header/header.js',
                    'app/scripts/directives/header/header-notification/header-notification.js',
                    'app/scripts/directives/sidebar/sidebar.js',
                    'app/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'app/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'app/scripts/controllers/main.js',
              'app/scripts/directives/timeline/timeline.js',
              'app/scripts/directives/notifications/notifications.js',
              'app/scripts/directives/chat/chat.js',
              'app/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'app/views/form.html',
        url:'/form'
       })
      .state('dashboard.excelconverter',{
        templateUrl:'app/views/excelToJson/views/excelToJson.html',
        controller:'excelTOJsonCtrl',
        url:'/excelTOJson'
      })
      .state('dashboard.jsontoxmlconvertion',{
        templateUrl:'app/views/jsonToXml/views/jsonToXml.html',
        controller:'jsonToXmlCtrl',
        url:'/jsonToXml'
      })
      .state('dashboard.listofdocuments',{
        templateUrl:'app/views/listOfDoc/views/listOfDoc.html',
        controller:'listOfDocCtrl',
        url:'/list-of-doc'
      })
      .state('dashboard.blank',{
        templateUrl:'app/views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'app/views/login/views/login.html',
            controller:'LoginController',
        url:'/login'
    })
      .state('signup',{
        templateUrl:'app/views/login/views/signup.html',
        controller:'signupController',
        url:'/signup'
      })
      .state('dashboard.chart',{
        templateUrl:'app/views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['app/scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'app/views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'app/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'app/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'app/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'app/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'app/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'app/views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    
