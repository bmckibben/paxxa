var appQuote = angular.module('apQuoteSearch', []);

appQuote.controller("ctlrQuoteSearch", [
	'$scope', '$http', 
	function($scope, $http) {
		var page = 0;
		$scope.greeting = "Search Quotes";
		$scope.quotes = [];
		$scope.search = function(searchTerm) {
			if (searchTerm.length < 3){
				$scope.searchedFor = searchTerm;
				return;
			}
			$http.get("/quotes.json",
				{"params": {"searchwords" : searchTerm, "page" : page}}
				).success(
					function(data,status,headers,config){
						$scope.quotes = data;
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






