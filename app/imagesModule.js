(function(){
angular.module('imagesModule', [])
	.controller('ImagesController', ['$scope', 'galleryFactory', function($scope, galleryFactory) {

	}])

	.directive('showImage', function(){
		return {
			restrict: 'E',
			scope: {
				source: '@',
			},
			templateUrl: 'app/views/show-image.html',
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})

	.directive('showThumbnails', function(){
		return {
			restrict: 'E',
			//scope!!!
			scope: {
				link: '@',
			},
			templateUrl: 'app/views/show-thumbnails.html',
			controller: function($scope, galleryFactory) {
				$scope.images = [];

				galleryFactory.getImages("nawigacja")
					.then(angular.bind($scope, function then() {
						$scope.images = galleryFactory.images;
					} ));
			},
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})

	.factory('galleryFactory', ['$http', function($http){
		var exports = {};
		exports.images = [];

		exports.getImages = function(galleryName) {
			return $http.get('app/'+galleryName+'Imgs.json')
			.success(function(data) {
				exports.images = data;
				console.log('app/'+galleryName+'Imgs.json');
				//console.log("Received data: ", data);
			})
			.error(function(data) {
				console.log("There was an error with loading json file");
			});
		};

		return exports;
	}]);

})();