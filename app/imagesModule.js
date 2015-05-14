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

				this.changeFactor = function(direction) {
					if(direction == 'left') {
						(this.factor > 0) ? this.factor-- : this.factor = Math.ceil(this.images.length / this.numberOfFullThumbs) - 1;
					} else {
						(this.factor < Math.ceil(this.images.length / this.numberOfFullThumbs) - 1) ? this.factor++ : this.factor = 0;
					};
					this.shift = this.factor * this.numberOfFullThumbs * 193;
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
					if(direction == 'left') {
						controller.imageNumber = (((controller.imageNumber - 1) % controller.images.length) + controller.images.length) % controller.images.length;
					} else {
						controller.imageNumber = (controller.imageNumber + 1) % controller.images.length;
					};
					controller.factor = Math.floor(controller.imageNumber / controller.numberOfFullThumbs);
					controller.shift = controller.factor * controller.numberOfFullThumbs * 193;
					$(element).parent().parent().siblings(':first').children().children(':first').children('.full-width-thumbnails').stop().animate({left: -controller.shift}, 1000, 'easeInOutExpo');
				}
			},
			scope: {
				direction: '@'
			}
		};
	})

	.directive('thumbnailsDisplay', function() {
		return {
			restrict: 'E',
			require: '^imageSlider',
			template: [
				'<div class="full-width-thumbnails" id="thumbnails-row" ng-swipe-left="changeShift(\'right\')" ng-swipe-right="changeShift(\'left\')">',
					'<div ng-repeat="image in images" class="thumbnail">',
						'<img ng-click="setImage($index)" ng-src="http://autoradio.poznan.pl/{{ image.filename }}"/>',
					'</div>',
				'</div>'
			].join("\n"),
			link: function(scope, element, attrs, controller) {
				scope.setImage = function(index) {
					controller.setImage(index);
				}
				scope.changeShift = function(direction) {
					controller.changeFactor(direction);
					$(element).children('.full-width-thumbnails').stop().animate({left: -controller.shift}, 1000, 'easeInOutExpo');
				}
			},
			scope: {
				images: '='
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
					controller.changeFactor(direction);
					$(element).siblings('thumbnails-display').children('.full-width-thumbnails').stop().animate({left: -controller.shift}, 1000, 'easeInOutExpo');
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