'use strict';

tripsModule.controller('TripsController', ['$scope', '$log', '$routeParams', '$resource', '$location', 'tripsService', 'cookiesService',
    function TripsController($scope, $log, $routeParams, $resource, $location, tripsService, cookiesService) {
        $scope.cities;
        $scope.message;
        tripsService.getCities()
                    .then(function (data) {
                        $scope.cities = data;
                    })
                    .catch($log.error);

        $scope.createTrip = function (trip, form) {
            if (!cookiesService.isLoged()) {
                $location.path('/unauthorized');
                return;
            }

            if (form.$valid) {
                var tripInfo = {
                    "from": trip.from,
                    "to": trip.to,
                    "availableSeats": trip.availableSeats,
                    "departureTime": trip.departureTime
                }

                tripsService.createTrip(tripInfo, cookiesService.getToken())
                    .then(function (data) {
                        console.log(data);
                        // $location.path('/trips');
                        $scope.message = 'Trip added successfully!';
                    })
                    .catch($log.error);
            }

            if (form.$invalid) {
                $scope.message = 'Invalid form data!';
                // $location.path('/error/InvalidForm');
            }
        }

        $scope.joinTrip = function (tripId) {
            console.log(tripId);
            if (!cookiesService.isLoged()) {
                $location.path('/unauthorized');
                return;
            }

            tripsService.joinTrip(tripId, cookiesService.getToken())
                    .then(function (data) {
                        console.log(data);
                        $location.path('/trips');
                    })
                    .catch($log.error);
        }

        $scope.tripDetails;
        $scope.tripId = $routeParams.id;
        if ($scope.tripId) {
            if (!cookiesService.isLoged()) {
                $location.path('/unauthorized');
            }

            tripsService.getTripDetails($scope.tripId, cookiesService.getToken())
                    .then(function (data) {
                        $scope.tripDetails = data;
                        console.log(data);
                    })
                    .catch($log.error);
        }
    }]);