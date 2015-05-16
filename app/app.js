(function(){
angular.module('mainModule', ['ui.router', 'imagesModule', 'contactModule', 'googleMapModule', 'ngTouch'])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: '/'
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

	.run(function($rootScope, $state, $location) {
		$rootScope.$on('$stateChangeSuccess',function(){
			$rootScope.currentPath = $location.url();
			console.log($state.current.url != '/');
			var $anchorHeight = $('.jumbotron').height() + 180;
			if($rootScope.currentPath != '/') {
		    $("html, body").stop().animate({ 
		    	scrollTop: $anchorHeight
		    }, 1000, 'easeInOutExpo');
		  }
		})
	})

	.controller('mainController', ['$scope', '$location', function($scope, $location) {
	}])

	.directive('scrollToContact', function(){
		return {
			restrict: 'A',
			link: function($scope, $element) {
				$element.on('click', function() {
					$("html, body").stop().animate({
						scrollTop: $(document).height() - $('#contact').height() - $('.navbar-header').height()
					}, 1000, 'easeInOutExpo');	
				});
			}
		}
	})

	.directive('navbar', function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/navbar.html',
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})

	.directive('collapseNavbar', function(){
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$(element).find("a").each(function(index, elm){
					$(elm).on('click', function(event){
						$('.navbar-collapse').collapse("hide");
					})
				})
			}
		};
	})

	.directive('header', function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/header.html',
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})

	.directive('footer', function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/footer.html',
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})
})();