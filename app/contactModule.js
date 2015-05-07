(function(){
angular.module('contactModule', [])

	.controller('contactController', ['$scope', function($scope){
		this.message = {};
		this.submitted = false;
		this.formRowNumbers = "col-md-12";
		this.messageRowNumbers = "col-md-0";

		this.sendMessage = function(contact) {
			this.submitted = true;
			this.message = angular.copy(contact);
			this.formRowNumbers = "col-md-10";
			this.messageRowNumbers = "col-md-2";
		};

	}])

})();