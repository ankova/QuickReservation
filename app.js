(function() {
    var myApp;
    myApp = angular.module("myApp", ["ngRoute", "ngAnimate"])
        .config(["$routeProvider", function ($routeProvider) {
            $routeProvider.when("/reservations", {
                templateUrl: "views/reservations.html"

            }).when("/make-reservation", {
                templateUrl: "views/make-reservation.html"

            }).otherwise({
                redirectTo: "/reservations"
            });
        }])
        .directive("reservations", function () {
            return {
                restricted: "E",
                replace: true,
                controller: function($scope, $http){
                    $http.get("reservations.json").success(function(data) {
                        $scope.reservations = data;
                    });
                }
            };
        })
        .controller("SubmitCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
            $scope.checkLocation = function(){
                $scope.currentUrl = $location.$$path;
                return $scope.currentUrl;
            };

            $scope.submitData = function() {

                var newData =   {
                    firstName : $scope.firstName,
                    lastName : $scope.lastName,
                    email : $scope.email,
                    date: $scope.date,
                    phoneNumber: $scope.phoneNumber,
                    covers: $scope.covers
                };

                if($scope.resForm.$valid){
                }
                else {
                    $scope.resForm.submited = true;
                };

                $scope.reservations.push(newData);

                //$http.post('reservations.json', newData).
                //    success(function(data, status, headers) {
                //        // this callback will be called asynchronously
                //        // when the response is available
                //        $scope.reservations.push(newData);
                //    }).
                //    error(function(data, status, headers, config) {
                //        // called asynchronously if an error occurs
                //        // or server returns response with an error status.
                //        console.log("error");
                //    });
            };
        }]);
})();
