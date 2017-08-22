$(document).ready(function() {

	$(".sidebar-toggle").click(function() {

		$("#sidebar").toggleClass("collapsed");
		$("#content").toggleClass("col-md-12 col-md-10");
		$(".sidebar-toggle").toggleClass("fa-chevron-right fa-chevron-left");

	});

	$("#new-wiki").on("click", function() {
		//checki if a new form is already open
		if ($("#0").length != 0) {
			alert("You must save or cancel new wiki before you can crate a new one.");
			return;
		}
		formHTML = getForm(0);
		insertHTML = '<div class="panel panel-default wiki-panel" id="0" >'+formHTML+'</div>'
		$(".wiki-panel:first").before(insertHTML);

		// submit handler

		//if save is successful replace content with new _display, update div id

		$("#wiki-cancel").on("click", function() {
			if(confirm("Are you sure you want to close this without saving?")){
				$("#0").remove();
			}	
		});	

	});

	$(".wiki-edit").on("click", function() {
		alert("you clicked clicked to edit wiki " + $(this).data("id"));
	});	



}) //document.ready

function getForm(id){

var form;

    //paths differ between dev and production, prod is /notifications/set
  $.ajax(
    {   url: "/wikis/wiki_form", 
        method: "get",
        data: {"wiki_id": id }, 
        dataType: "html" ,
        async: false
    })
    .done(function(data){form = data})
    .fail(function(){ alert("Failed to retreive form.")});
    return form;
}; //getForm