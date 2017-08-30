$(document).ready(function() {

	$(".sidebar-toggle").click(function() {

		$("#sidebar").toggleClass("collapsed");
		$("#content").toggleClass("col-md-12 col-md-10");
		$(".sidebar-toggle").toggleClass("fa-chevron-right fa-chevron-left");

	});

	bindDisplayActionIcons()

	$('[data-toggle="tooltip"]').tooltip();
	// requires in <i>:
	// data-toggle='tooltip' data-placement='left' title='title'


    $('i.tree-toggler').click(function () {
        $(this).parent().children('ul.tree').toggle(300);
        $(this).toggleClass('fa-chevron-right fa-chevron-down')
    });

    $(".tree").hide()

	
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

	insertHTML = '<div class="panel panel-default wiki-panel" id="0" >'+formHTML+'</div>';
	$(".wiki-panel:first").before(insertHTML);

};	

function insertAfterWiki(formHTML, parentID){

	insertHTML = '<div class="panel panel-default wiki-panel" id="0" >'+formHTML+'</div>';
	$("#"+parentID).after(insertHTML);
	$("#wiki_parent").val(parentID);

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


// get the html to display wiki in div
function getDisplay(id) {
	//if new update div id with record id
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// bind click event for the icons on a newly displayed wiki form
function bindEditActionIcons(thisID) {

	$("#wiki-cancel").on("click", function() {
		if(confirm("Are you sure you want to close this without saving?")){
			if (thisID==0){
				$("#"+thisID).remove();
			}else{
				reDisplayWiki(thisID);
			};
		}		
	})

};

function bindDisplayActionIcons() {
	$("#wiki-new").on("click", function() {

		if (checkExisting()) { return };		
		insertAtTop(getForm(0));
		bindEditActionIcons(0);

	});

	$(".wiki-edit").on("click", function() {

		if (checkExisting()) { return };
		editInPlace(getForm($(this).data("id")),$(this).data("id"));
		bindEditActionIcons($(this).data("id"));

	});	

	$(".wiki-here").on("click", function() {

		if (checkExisting()) { return };
		insertAfterWiki(getForm(0),$(this).data("id"));
		bindEditActionIcons(0);

	});

	$('[data-toggle="tooltip"]').tooltip();

}	

function reDisplayWiki(id){
    
  $.ajax(
    {   url: "/wikis/re_display", 
        method: "get",
        data: {"wiki_id": id }, 
        dataType: "html" ,
        async: false
    })
    .done(function(data){insertHTML = data})
    .fail(function(){ alert("Failed to retreive wiki.")});

	$("#"+id).html(insertHTML);
	bindDisplayActionIcons()
	$('[data-toggle="tooltip"]').tooltip();

}; //reDisplay
