angular.module('app.directives', [])

.directive('detectFocus', [function($scope){
	return {
    "restrict" : "AC",
    "link" : function(scope, elem, attrs,controller) {

      elem.on("focus", function() {
        scope.scroll();
      });
      
      // elem.on("blur", function() {
      //   console.log(attrs.name + " lost focus");
      // });
      
            
    }
  }
}]);

