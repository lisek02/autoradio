(function(){
angular.module('galleryModule', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  }])

  .service('GalleryServ', ['$http', function($http) {
    this.getImages = function(path) {
      return $http.get(path)
    }
  }])

  .controller('galleryController', ['$scope', 'GalleryServ', function($scope, GalleryServ){
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
  }])


})();
