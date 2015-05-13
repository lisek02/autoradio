(function(){
angular.module('imagesModule', ['ngAnimate'])

	.directive('singleImage', function() {
		return {
			restrict: 'E',
			scope: {
				img: '@',
			},
			templateUrl: 'app/views/single-image.html'
		}
	})

	.directive('imageSlider', function() {
		return {
			restrict: 'E',
			scope: {
				json: '@',
			},
			templateUrl: 'app/views/image-slider.html',
			controller: function($scope, galleryFactory) {
				this.imageNumber = 0;
				this.images = [];
				this.factor = 0;
				this.shift = 0;
				this.numberOfFullThumbs = Math.floor(document.getElementById('content').offsetWidth / 193);		//number of full thumbnails in a row
				
				this.isSet = function(number) {
					return this.imageNumber === number;
				};

				this.setImage = function(number) {
					this.imageNumber = number;
				};

				this.increaseFactor = function() {
					console.log(event.target);
					this.factor++;
					$(event.target).parent().parent().stop().animate({left: -(this.factor) * numberOfFullThumbs * 193}, 1000, 'easeInOutExpo');
				}

				this.decreaseFactor = function() {
					this.factor--;
					$(event.target).parent().parent().stop().animate({left: -(this.factor) * numberOfFullThumbs * 193}, 1000, 'easeInOutExpo');
				}

				galleryFactory.getImages($scope.json)
					.then(angular.bind(this, function then() {
						this.images = galleryFactory.images;
					} ));
			},
			controllerAs: "sliderCtrl"
		};
	})

	.directive('imageNavigation', function() {
		return {
			restrict: 'E',
			require: '^imageSlider',
			template: [
				'<span class="navigate navigate-{{ direction }} glyphicon glyphicon-chevron-{{ direction }}" ng-click="changeIndex(direction)"></span>'
			].join('\n'),
			link: function(scope, element, attrs, controller) {
				scope.changeIndex = function(direction) {
					console.log(element);
					if(direction == 'left') {
						controller.imageNumber = (((controller.imageNumber - 1) % controller.images.length) + controller.images.length) % controller.images.length;
					} else {
						controller.imageNumber = (controller.imageNumber + 1) % controller.images.length;
					};
					controller.factor = Math.floor(controller.imageNumber / controller.numberOfFullThumbs);
					controller.shift = controller.factor * controller.numberOfFullThumbs * 193;
					$(element).parent().parent().siblings(':first').children().children('.full-width-thumbnails').stop().animate({left: -controller.shift}, 1000, 'easeInOutExpo');
				}
			},
			scope: {
				direction: '@'
			}
		};
	})

	.directive('thumbnailsNavigation', function() {
		return {
			restrict: 'E',
			require: '^imageSlider',
			template: [
				'<span class="glyphicon glyphicon-chevron-{{ direction }} thumbnails-navigate thumbnails-navigate-{{ direction }}" ng-click="changeShift(direction)"></span>'
			].join('\n'),
			link: function(scope, element, attrs, controller) {
				scope.changeShift = function(direction) {
					if(direction == 'left') {
						(controller.factor > 0) ? controller.factor-- : controller.factor = Math.round(controller.images.length / controller.numberOfFullThumbs);
					} else {
						(controller.factor < Math.round(controller.images.length / controller.numberOfFullThumbs)) ? controller.factor++ : controller.factor = 0;
					};
					$(element).siblings('.full-width-thumbnails').stop().animate({left: -(controller.factor) * controller.numberOfFullThumbs * 193}, 1000, 'easeInOutExpo');
				}	
			},
			scope: {
				direction: '@'
			}
		};
	})

	.factory('galleryFactory', ['$http', function($http){
		var exports = {};
		exports.images = [];

		exports.getImages = function(source) {
			return $http.get(source)
			.success(function(data) {
				exports.images = data;
			})
			.error(function(data) {
				console.log("There was an error with loading json file");
			});
		};

		return exports;
	}]);

})();