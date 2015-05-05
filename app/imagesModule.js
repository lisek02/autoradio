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
				var imageNumber = 0;
				this.images = [];
				var factor = 0;
				var shift = 0;
				var numberOfFullThumbs = Math.floor(document.getElementById('content').offsetWidth / 193);		//number of full thumbnails in a row
				
				this.isSet = function(number) {
					return imageNumber === number;
				};

				this.setImage = function(number) {
					imageNumber = number;
				};

				this.increaseIndex = function(event) {
					imageNumber = (imageNumber + 1) % this.images.length;
					this.slideThumbnails(event);
				}

				this.decreaseIndex = function(event) {
					imageNumber = (((imageNumber - 1) % this.images.length) + this.images.length) % this.images.length;
					this.slideThumbnails(event);
				}

				this.slideThumbnails = function() {
					factor = Math.floor(imageNumber / numberOfFullThumbs);
					shift = factor * numberOfFullThumbs * 193;
					$(event.target).parent().parent().siblings(':first').children().children('.full-width-thumbnails').stop().animate({left: -shift}, 1000, 'easeInOutExpo');
				}

				this.increaseShift = function(event) {
					(factor < Math.round(this.images.length / numberOfFullThumbs)) ? factor++ : factor = 0;
					$(event.target).siblings('.full-width-thumbnails').stop().animate({left: -(factor) * numberOfFullThumbs * 193}, 1000, 'easeInOutExpo');
				}

				this.decreaseShift = function() {
					(factor > 0) ? factor-- : factor = Math.round(this.images.length / numberOfFullThumbs);
					$(event.target).siblings('.full-width-thumbnails').stop().animate({left: -(factor) * numberOfFullThumbs * 193}, 1000, 'easeInOutExpo');
				}

				galleryFactory.getImages($scope.json)
					.then(angular.bind(this, function then() {
						this.images = galleryFactory.images;
					} ));
			},
			controllerAs: "sliderCtrl"
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