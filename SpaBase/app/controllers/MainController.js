'use strict';

tripsModule.controller('MainController',
    ['$scope', '$log', '$routeParams', '$resource', '$location', 'statsService',
function MainController($scope, $log, $routeParams, $resource, $location, statsService) {
    $scope.header = 'app/views/partials/header.html';
    $scope.footer = 'app/views/partials/footer.html';
    $scope.overallStatistic = 'app/views/partials/overallStatistic.html';
    $scope.tripsPublic = 'app/views/partials/tripsHome.html';
    $scope.driversPublic = 'app/views/partials/drivers.html';

    $scope.tripsStatistic;
    statsService.getTripsStatistics()
                .then(function (data) {
                    $scope.tripsStatistic = data;
                    console.log(data);
                })
                .catch($log.error);

    $scope.latestTrips;
    statsService.getLatestTrips()
                .then(function (data) {
                    $scope.latestTrips = data;
                    console.log(data);
                })
                .catch($log.error);

    $scope.latestDrivers;
    statsService.getLatestDrivers()
                .then(function (data) {
                    $scope.latestDrivers = data;
                    console.log(data);
                })
                .catch($log.error);
}]);