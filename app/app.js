(function(){
angular.module('mainModule', ['ui.router', 'imagesModule'])

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

	.run(function($rootScope) {
		$rootScope.$on('$stateChangeSuccess',function(){
				var $anchor = $('#content');
				console.log("anchor ", $anchor);
		    $("html, body").stop().animate({ 
		    	scrollTop: $anchor.offset().top - 90
		    }, 1000, 'easeInOutExpo');
		})
	})

	.controller('mainController', ['$scope', function($scope) {
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
})();