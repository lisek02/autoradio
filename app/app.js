(function(){
angular.module('mainModule', ['ui.router', 'imagesModule', 'contactModule', 'galleryModule', 'googleMapModule', 'ngTouch', 'ui.bootstrap'])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('root', {
				abstract: true,
				templateUrl: 'app/views/root.html'
			})
			// .state('gallery', {
			// 	abstract: true,
			// 	templateUrl: 'app/views/gallery.html'
			// })
			// .state('gallery.list', {
			// 	url: '/galeria',
			// 	templateUrl: 'app/views/gallery-list.html'
			// })
			.state('gallery', {
				url: '/galeria',
				templateUrl: 'app/views/gallery.html',
				controller: 'galleryController'
			})
			.state('gallery.single', {
	      params: { brand: '', model: '' },
	      onEnter: function($modal, $state, $stateParams, $location) {
	        return $modal.open({
	      		controller: 'galleryItemController',
	          templateUrl: 'app/views/gallery-single.html',
	          windowClass: 'gallery-single'
	        }).result.then(function(result) {
	          if (result == 'gallery') {
	            return $state.go('gallery');
	          }
	        }, function(result) {
	          return $state.go('^');
	        });
	      }
			})
			.state('root.home', {
				url: '/'
			})
			.state('root.about', {
				url: '/about',
				templateUrl: 'app/views/about.html'
			})
			.state('root.naglosnienie', {
				url: '/naglosnienie',
				templateUrl: 'app/views/naglosnienie.html'
			})
			.state('root.nawigacja', {
				url: '/nawigacja',
				templateUrl: 'app/views/nawigacja.html'
			})
			.state('root.cbradio', {
				url: '/cbradio',
				templateUrl: 'app/views/cbradio.html'
			})
			.state('root.montaz', {
				url: '/montaz',
				templateUrl: 'app/views/montaz.html'
			})
			.state('root.multimedia', {
				url: '/multimedia',
				templateUrl: 'app/views/multimedia.html'
			})
			.state('root.kamery', {
				url: '/kamery',
				templateUrl: 'app/views/kamery.html'
			})
	}])

	.run(function($rootScope, $state, $location) {
		$rootScope.$on('$stateChangeSuccess',function(){
			$rootScope.currentPath = $location.url();
			var $anchorHeight = $('.jumbotron').height() + 180;
			if($rootScope.currentPath != '/') {
		    $("html, body").stop().animate({ 
		    	scrollTop: $anchorHeight
		    }, 1000, 'easeInOutExpo');
		  }
		})
	})

	.controller('mainController', ['$scope', '$location', function($scope, $location) {
		this.tmp = 'mainCtrl'
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
