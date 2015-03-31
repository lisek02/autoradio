(function(){
angular.module('imagesModule', [])

	.directive('showImage', function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/show-image.html',
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	});
	
})();