(function(){
angular.module('galleryModule', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  }])

  .service('GalleryServ', ['$http', function($http) {
    this.getImages = function(path) {
      return $http.get(path)
    }
  }])

  .controller('galleryController', ['$scope', '$state', 'GalleryServ', function($scope, $state, GalleryServ) {
    GalleryServ.getImages("assets/images/galeria/gallery.json").then(function(response) {
      $scope.galleryImages = response.data;
    })

    _.each($scope.galleryImages, function(image) {
      image.show = true;
    })

    $scope.toggleTile = function(index) {
      if ($scope.galleryImages[index].show) {
        _.each($scope.galleryImages, function(image) {
          image.show = false;
        })
      } else {
        _.each($scope.galleryImages, function(image) {
          image.show = false;
        })
        $scope.galleryImages[index].show = true;
      }
    }

    $scope.showModal = function(brand, model) {
      $state.go('gallery.single', { brand: brand, model: model })
    }
  }])

  .controller('galleryItemController', ['$scope', '$state', '$stateParams', 'GalleryServ', function($scope, $state, $stateParams, GalleryServ) {
    $scope.brand = $stateParams.brand;
    $scope.model = $stateParams.model;
  }])


})();
