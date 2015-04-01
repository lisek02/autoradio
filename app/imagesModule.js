(function(){
angular.module('imagesModule', [])
	.controller('ImagesController', ['$scope', 'galleryFactory', function($scope, galleryFactory) {

	}])

	.directive('imageSlider', function() {
		return {
			restrict: 'E',
			scope: {
				image: '@',
				json: '@',
			},
			templateUrl: 'app/views/image-slider.html',
			controller: function($scope, galleryFactory) {
				$scope.images = [];

				galleryFactory.getImages($scope.json)
					.then(angular.bind($scope, function then() {
						$scope.images = galleryFactory.images;
					} ));
			},
		};
	})

	.factory('galleryFactory', ['$http', function($http){
		var exports = {};
		exports.images = [];

		exports.getImages = function(source) {
			return $http.get(source)
			.success(function(data) {
				exports.images = data;
				console.log(source);
				//console.log("Received data: ", data);
			})
			.error(function(data) {
				console.log("There was an error with loading json file");
			});
		};

		return exports;
	}]);

})();