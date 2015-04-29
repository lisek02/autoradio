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
				
				this.isSet = function(number) {
					return this.imageNumber === number;
				};

				this.setImage = function(number) {
					this.imageNumber = number;
				};

				this.increaseIndex = function() {
					this.imageNumber = (this.imageNumber + 1) % this.images.length;
					this.slideThumbnails();
					console.log(this.imageNumber);
				}

				this.decreaseIndex = function() {
					this.imageNumber = (((this.imageNumber - 1) % this.images.length) + this.images.length) % this.images.length;
					this.slideThumbnails();
					console.log(this.imageNumber);
				}

				this.slideThumbnails = function() {
					var numberOfFullThumbs = Math.floor(document.getElementById('content').offsetWidth / 193);		//number of full thumbnails in a row
					var factor = Math.floor(this.imageNumber / numberOfFullThumbs);
					var shift = factor * numberOfFullThumbs * 193;
					$('.full-width-thumbnails').stop().animate({left: -shift}, 1000, 'easeInOutExpo');
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