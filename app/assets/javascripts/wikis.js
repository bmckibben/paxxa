$(document).ready(function() {

	$(".sidebar-toggle").click(function() {

		$("#sidebar").toggleClass("collapsed");
		$("#content").toggleClass("col-md-12 col-md-10");
		$("#content").toggleClass("fa-chevron-right fa-chevron-left");

	});

}) //document.ready