'use strict';

tripsModule.controller('TripsController', ['$scope', '$log', '$routeParams', '$resource', '$location', 'tripsService', 'cookiesService', 'cities',
    function TripsController($scope, $log, $routeParams, $resource, $location, tripsService, cookiesService, cities) {
        //$scope.orderBy = 'date';
        //$scope.orderType = 'asc';

        $scope.cities;
        if (cities.length === 0) {
            tripsService.getCities()
                        .then(function (data) {
                            cities.push.apply(cities, data);
                            $scope.cities = cities;
                        })
                        .catch($log.error);
        }
        else {
            $scope.cities = cities;
        }

        $scope.message;

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

            return;
        }

        // initial trips load
        $scope.trips;
        tripsService.getTripsByPageOnly(1, cookiesService.getToken())
                .then(function (data) {
                    $scope.page = 1;
                    $scope.trips = data;
                }, function (error) {
                    $location.path('/error/' + error['message']);
                })
                .catch($log.error);

        $scope.page = 1;

        $scope.getTripsByPageOnly = function (page) {
            if (!cookiesService.isLoged()) {
                $location.path('/unauthorized');
                return;
            }

            if (page <= 0) {
                page = 1;
                $scope.page = 1;
            }

            tripsService.getTripsByPageOnly(page, cookiesService.getToken())
                .then(function (data) {
                    $scope.page = page;
                    $scope.trips = data;
                }, function (error) {
                    $location.path('/error/' + error['message']);
                })
                .catch($log.error);
        }

        $scope.getTripsFilteredPaged = function (page, orderBy, orderType, from, to, isFinished, onlyMineTrips) {
            if (!cookiesService.isLoged()) {
                $location.path('/unauthorized');
                return;
            }

            if (page <= 0) {
                page = 1;
                $scope.page = 1;
            }

            if (page !== undefined &&
                    orderBy !== undefined &&
                    orderType !== undefined &&
                    from !== undefined &&
                    isFinished !== undefined &&
                    onlyMineTrips !== undefined) {
                tripsService.getTripsFilteredPaged(page, orderBy, orderType, from, isFinished, onlyMineTrips, cookiesService.getToken())
                .then(function (data) {
                    console.log(2);
                    console.log(page);
                    console.log(orderBy);
                    console.log(orderType);
                    console.log(from);
                    console.log(isFinished);
                    console.log(onlyMineTrips);
                    $scope.page = page;
                    $scope.trips = data;
                }, function (error) {
                    $location.path('/error/' + error['message']);
                })
                .catch($log.error);
            } else {
                var currentTrips = [];
                var isIntersected = false;
                console.log(isIntersected);
                if (orderBy !== undefined && orderType !== undefined) {
                    tripsService.getTripsOrderedPaged(page, orderBy, orderType, cookiesService.getToken())
                        .then(function (data) {
                            currentTrips = data;
                            isIntersected = true;
                            console.log('INNER: ' + isIntersected);
                            console.log('L1: ' + currentTrips.length);
                        }, function (error) {
                            $location.path('/error/' + error['message']);
                        })
                        .catch($log.error);
                }

                console.log(isIntersected);
                if (from !== undefined && to !== undefined) {
                    tripsService.getTripsFromToPaged(page, from, to, cookiesService.getToken())
                        .then(function (data) {
                            if (isIntersected === true) {
                                currentTrips = selectIntersections(currentTrips, data);
                            } else if (currentTrips.length === 0) {
                                currentTrips = data;
                            } else {
                                currentTrips = selectIntersections(currentTrips, data);
                            }
                            isIntersected = true;
                            console.log('L2: ' + currentTrips.length);
                        }, function (error) {
                            $location.path('/error/' + error['message']);
                        })
                        .catch($log.error);
                }

                console.log(isIntersected);
                if (isFinished !== undefined) {
                    tripsService.getFinishedTripsPaged(page, isFinished, cookiesService.getToken())
                        .then(function (data) {
                            if (isIntersected === true) {
                                currentTrips = selectIntersections(currentTrips, data);
                            } else if (currentTrips.length === 0) {
                                currentTrips = data;
                            } else {
                                currentTrips = selectIntersections(currentTrips, data);
                            }
                            isIntersected = true;
                            console.log('L3: ' + currentTrips.length);
                        }, function (error) {
                            $location.path('/error/' + error['message']);
                        })
                        .catch($log.error);
                }

                console.log(isIntersected);
                if (onlyMineTrips !== undefined) {
                    tripsService.getMyTripsPaged(page, onlyMineTrips, cookiesService.getToken())
                        .then(function (data) {
                            if (isIntersected === true) {
                                currentTrips = selectIntersections(currentTrips, data);
                            } else if (currentTrips.length === 0) {
                                currentTrips = data;
                            } else {
                                currentTrips = selectIntersections(currentTrips, data);
                            }
                            isIntersected = true;
                            console.log('L4: ' + currentTrips.length);
                        }, function (error) {
                            $location.path('/error/' + error['message']);
                        })
                        .catch($log.error);
                } 

                console.log(isIntersected);
                // add atleast 10
                if (!isIntersected) {
                    tripsService.getTripsByPageOnly(page, cookiesService.getToken())
                        .then(function (data) {
                            console.log(isIntersected);
                            currentTrips = data;
                            console.log('L5: ' + currentTrips.length);
                        }, function (error) {
                            $location.path('/error/' + error['message']);
                        })
                        .catch($log.error);
                }
                
                $scope.page = page;
                $scope.trips = currentTrips;
            }
        }

        function selectIntersections(firstArray, secondArray) {
            var newArray = [];
            if (firstArray.length === 0 || secondArray.length === 0) {
                return newArray;
            }

            for (var i = 0; i < firstArray.length; i++) {
                for (var j = 0; j < secondArray.length; j++) {
                    if (firstArray[i]['id'] === secondArray[j]['id']) {
                        newArray.push(firstArray[i]);
                        break;
                    }
                }
            }

            return newArray;
        }
    }]);