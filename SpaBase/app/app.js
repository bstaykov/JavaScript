'use strict';

var tripsModule = angular
    .module('tripsModule', ['ngRoute', 'ngResource', 'ngCookies', 'ngSanitize'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/partials/home.html',
            }).when('/register', {
                templateUrl: 'app/views/partials/register.html'
            }).when('/userInfo', {
                templateUrl: 'app/views/partials/userInfo.html'
            }).when('/trips', {
                templateUrl: 'app/views/partials/trips.html'
            }).when('/trips/create', {
                templateUrl: 'app/views/partials/createTrip.html'
            }).when('/trips/:id/', {
                templateUrl: 'app/views/partials/tripDetails.html'
            }).when('/drivers', {
                templateUrl: 'app/views/partials/drivers.html'
            }).when('/drivers/:id/', {
                templateUrl: 'app/views/partials/driverDetails.html'
            }).when('/unauthorized', {
                templateUrl: 'app/views/partials/unauthorized.html'
            }).when('/error', {
                templateUrl: 'app/views/partials/error.html'
            }).when('/error/:message/', {
                templateUrl: 'app/views/partials/error.html'
            });

        // REDIRECT when route is wrong
        $routeProvider.otherwise({ redirectTo: '/' });
    })
    //.constant('baseUrl', 'http://localhost:1234/');
    .constant('baseUrl', 'http://spa2014.bgcoder.com/');