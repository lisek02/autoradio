/*
AngularJS directives to integrate Google Maps into aplication
source from http://angular-ui.github.io/
*/
(function(){
angular.module('googleMapModule', ['uiGmapgoogle-maps'])

	.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization',
        china: true
    });
	}])

	.controller("googleMapController", function($scope, uiGmapGoogleMapApi) {
	    // Do stuff with your $scope.
	    // Note: Some of the directives require at least something to be defined originally!
	    // e.g. $scope.markers = []

	    // uiGmapGoogleMapApi is a promise.
	    // The "then" callback function provides the google.maps object.
			$scope.map = { center: { latitude: 52.409287, longitude: 16.962510 }, zoom: 16 };

	    uiGmapGoogleMapApi.then(function(maps) {

	    });
	});

})();