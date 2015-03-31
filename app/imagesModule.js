(function(){
angular.module('imagesModule', [])
	.controller('ImagesController', ['$scope', function($scope) {
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
	});

})();