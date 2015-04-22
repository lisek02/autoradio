(function(){
angular.module('mainModule', ['ui.router', 'imagesModule'])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("");

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/views/about.html'
			})
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
			})
	}])

	.run(function($rootScope, $state) {
		$rootScope.$on('$stateChangeSuccess',function(){
				var $anchor = $('#content');
		    $("html, body").stop().animate({ 
		    	scrollTop: $anchor.offset().top - 90
		    }, 1000, 'easeInOutExpo');
		})
	})

	.controller('mainController', ['$scope', function($scope) {
	}])

	.directive('scrollToContact', function(){
		return {
			restrict: 'A',
			link: function($scope, $element) {
				$element.on('click', function() {
					$("html, body").stop().animate({
						scrollTop: $(document).height()
					}, 1000, 'easeInOutExpo');	
				});
			}
		}
	})

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