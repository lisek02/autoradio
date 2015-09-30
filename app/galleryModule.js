(function(){
angular.module('galleryModule', ['ui.router', 'ngSanitize'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  }])

  .service('GalleryServ', ['$http', function($http) {
    this.getGalleryStructure = function(path) {
      return $http.get(path)
    }

    this.getList = function() {
      return $http({
        method : 'GET',
        url : 'http://autoradio.poznan.pl/app/gallery_list.php',
      })
    }

    this.getImages = function(brand, model) {
      return $http({
        method : 'GET',
        url : 'http://autoradio.poznan.pl/app/gallery_images.php',
        params : { brand: brand, model: model }
      })
    }
  }])

  .controller('galleryController', ['$scope', '$state', 'GalleryServ', function($scope, $state, GalleryServ) {
    // GalleryServ.getGalleryStructure("assets/images/galeria/gallery.json").then(function(response) {
    //   $scope.galleryImages = response.data;
    // })
    GalleryServ.getList().then(function(response) {
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
    $scope.brand = $stateParams.brand.toLowerCase();
    $scope.model = $stateParams.model.toLowerCase();

    GalleryServ.getImages($scope.brand, $scope.model).then(function(response) {
      $scope.galleryFiles = response.data.files;
      $scope.galleryDescription = response.data.description;
    })
  }])

})();
