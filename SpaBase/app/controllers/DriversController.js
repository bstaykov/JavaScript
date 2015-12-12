
'use strict';

tripsModule.controller('DriversController', ['$scope', '$log', '$routeParams', '$resource', '$location', 'driversService', 'cookiesService',
    function DriversController($scope, $log, $routeParams, $resource, $location, driversService, cookiesService) {
        $scope.driverDetails;
        $scope.driverId = $routeParams.id;
        if ($scope.driverId) {
            if (!cookiesService.isLoged()) {
                $location.path('/unauthorized');
            }

            driversService.getDriverDetails($scope.driverId, cookiesService.getToken())
                    .then(function (data) {
                        $scope.driverDetails = data;
                        console.log(data);
                    })
                    .catch($log.error);
        }
    }]);