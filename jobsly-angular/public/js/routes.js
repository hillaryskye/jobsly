app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/appliation', { // must be above '/:id' otherwise it'll think that the ID is 'new'
          templateUrl: 'partials/application.html',
          controller: 'ApplicationCtrl'
        })
        // .when('/:id/edit', {
        //   templateUrl: 'partials/edit.html',
        //   controller: 'EditCtrl'
        // })
        .when('/:id', {
          templateUrl: 'partials/show.html',
          controller: 'ShowCtrl'
        })
        // .otherwise({ redirectTo: '/' });
        // }
        .otherwise({
          templateUrl: 'partials/home.html',
          controller: 'MainCtrl'
        })
        // use the HTML5 History API
         $locationProvider.html5Mode(true);
}]);
