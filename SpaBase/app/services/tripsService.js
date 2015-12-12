'use strict';

tripsModule.factory('tripsService', ['$http', '$q', 'baseUrl',
    function tripsService($http, $q, baseUrl) {
        function getCities() {
            var deferred = $q.defer();
            $http.get(baseUrl + 'api/cities')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function createTrip(trip, key) {
            var deferred = $q.defer();

            $http.post(
                baseUrl + 'api/trips',
                trip, {
                    headers: { 'Authorization': "Bearer " + key }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getTripDetails(tripId, key) {
            var deferred = $q.defer();

            $http.get(
                baseUrl + 'api/trips/' + tripId,
                {
                    headers: { 'Authorization': "Bearer " + key }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function joinTrip(tripId, key) {
            console.log('T' + tripId);
            console.log('K' + key);
            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: baseUrl + 'api/trips/' + tripId,
                headers: {
                    'Authorization': "Bearer " + key
                }
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }


        return {
            getCities: getCities,
            createTrip: createTrip,
            getTripDetails: getTripDetails,
            joinTrip: joinTrip
        };
    }]);