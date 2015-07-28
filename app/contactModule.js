(function(){
angular.module('contactModule', [])

	.controller('contactController', ['$scope', '$http', function($scope, $http){
		this.message;
		this.submitted = false;
    this.showError = false;
    this.formTitle = "Napisz do nas";

    this.formData = {};
    submissionMessage = {}

    // Updated code thanks to Yotam
    var param = function(data) {
          var returnString = '';
          for (d in data){
              if (data.hasOwnProperty(d))
                 returnString += d + '=' + data[d] + '&';
          }
          // Remove last ampersand and return
          return returnString.slice( 0, returnString.length - 1 );
    };

    this.sendMessage = function() {
      var contactCtrl = this;
      contactCtrl.submitted = true
      $http({
        method : 'POST',
        url : 'app/process.php',
        data : param(this.formData),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
        if (!data.success) {
          contactCtrl.errorEmail = data.errors.email;
          contactCtrl.errorTextarea = data.errors.message;
          contactCtrl.submissionMessage = data.messageError;
          contactCtrl.showError = true;
        } else {
          contactCtrl.submissionMessage = data.messageSuccess;
          contactCtrl.formData = {};
          contactCtrl.submitted = false;
          contactCtrl.showError = false;
          contactCtrl.formTitle = "Dziękujemy!"
        }
       });
     };

	}])

})();
