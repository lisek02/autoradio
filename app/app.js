(function(){
angular.module('mainModule', ['ui.router'])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/about");

		$stateProvider
			.state('about', {
				url: '/about',
				templateUrl: 'app/views/about.html'
			})
			.state('nawigacja', {
				url: '/nawigacja',
				templateUrl: 'app/views/nawigacja.html'
			})
			.state('cbradio', {
				url: '/cbradio',
				templateUrl: 'app/views/cbradio.html'
			})
			.state('montaz', {
				url: '/montaz',
				templateUrl: 'app/views/montaz.html'
			})			
			.state('inne', {
				url: '/inne',
				templateUrl: 'app/views/inne.html'
			});
	}])

	.controller('mainController', ['$scope', 'galleryFactory', function($scope, galleryFactory) {
		this.images = [];

		galleryFactory.getImages("nawigacja")
			.then(angular.bind(this, function then() {
				this.images = galleryFactory.images;
				console.log(this.images);
			} ));
	}])

	.directive('navbar', function(){
		// Runs during compile
		return {
			restrict: 'E',
			templateUrl: 'app/views/navbar.html',
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})

	.directive('header', function(){
		// Runs during compile
		return {
			restrict: 'E',
			templateUrl: 'app/views/header.html',
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})

	.directive('footer', function(){
		// Runs during compile
		return {
			restrict: 'E',
			templateUrl: 'app/views/footer.html',
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
				console.log("There was an erro with loading json file");
			});
		};

		return exports;
	}]);

})();