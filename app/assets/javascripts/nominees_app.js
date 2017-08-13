var appNominee = angular.module('apNomineeSearch', []);

appNominee.controller("ctlrNomineeSearch", [
	'$scope', '$http', 
	function($scope, $http) {
		var page = 0;
		$scope.greeting = "Search Novels";
		$scope.nominees = [];
		$scope.search = function(searchTerm) {
			if (searchTerm.length < 3){
				$scope.searchedFor = searchTerm;
				return;
			}
			$http.get("/nominees.json",
				{"params": {"searchwords" : searchTerm, "page" : page}}
				).success(
					function(data,status,headers,config){
						$scope.nominees = data;
				}).error(
				function(data,status,headers,config){
					alert("Houston, we have a problem: " + status);
				});	
			$scope.searchedFor = searchTerm;
		};
		$scope.previousPage = function(){
			if (page > 0) {
				page = page - 1
				$scope.search($scope.searchwords)
			}	
		};
		$scope.nextPage = function(){
			page = page + 1
			$scope.search($scope.searchwords)
		};		
	}
])






