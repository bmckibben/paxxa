$(document).ready(function() {

	$(".sidebar-toggle").click(function() {

		$("#sidebar").toggleClass("collapsed");
		$("#content").toggleClass("col-md-12 col-md-10");
		$(".sidebar-toggle").toggleClass("fa-chevron-right fa-chevron-left");

	});

	$("#wiki-new").on("click", function() {

		if (checkExisting()) { return };		
		InsertAtTop(getForm(0));
		bindActionIcons($(this).data("id"));
		// submit handler
		//if save is successful replace content with new _display, update div id
	});

	$(".wiki-edit").on("click", function() {

		alert("you clicked clicked to edit wiki " + $(this).data("id"));
		if (checkExisting()) { return };
		editINPlace(getForm($(this).data("id")));
		bindActionIcons($(this).data("id"));
		// submit handler
		//if save is successful replace content with new _display, update div id
	});	

	$("#wiki-here").on("click", function() {
		
		if (checkExisting()) { return };
		InsertAfter(getForm($(this).data("id")));
		bindActionIcons($(this).data("id"));
		// submit handler
		//if save is successful replace content with new _display, update div id
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

function insertAtTop(formHTML){

	insertHTML = '<div class="panel panel-default wiki-panel" id="0" >'+formHTML+'</div>'
	$(".wiki-panel:first").before(insertHTML);()

};	

function insertAfter(formHTML, divID){

	insertHTML = '<div class="panel panel-default wiki-panel" id="0" >'+formHTML+'</div>'
	$("#"+divID).after(insertHTML);

};

function editInPlace(formHTML, divID){

	insertHTML = '<div class="panel panel-default wiki-panel" id="'+divID+'" >'+formHTML+'</div>'
	$("#"+divID).replaceWith(insertHTML);

};

function checkExisting(){
	if ($("#0").length != 0) {
		alert("You must save or cancel any new wiki before you can crate a new one.");
		return true;
	};
	return false;
};

function bindActionIcons(divID) {
	$("#wiki-cancel").on("click", function() {
		if(confirm("Are you sure you want to close this without saving?")){
			$("#0").remove();
		}	
	});	
}