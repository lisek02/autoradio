(function(){
angular.module('contactModule', [])

	.controller('contactController', ['$scope', function($scope){
		this.message;
		this.submitted = false;

		this.sendMessage = function(contact) {
			this.submitted = true;
			this.message = angular.copy(contact);
		};

	}])

})();