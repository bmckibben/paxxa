$(document).ready(function() {

	$(".sidebar-toggle").click(function() {

		$("#sidebar").toggleClass("collapsed");
		$("#content").toggleClass("col-md-12 col-md-10");
		$(".sidebar-toggle").toggleClass("fa-chevron-right fa-chevron-left");

	});

	$("#wiki-new").on("click", function() {

		if (checkExisting()) { return };		
		insertAtTop(getForm(0));
		bindActionIcons(0);
		// submit handler
		//if save is successful replace content with new _display, update div id
	});

	$(".wiki-edit").on("click", function() {

		alert("you clicked clicked to edit wiki " + $(this).data("id"));
		if (checkExisting()) { return };
		editInPlace(getForm($(this).data("id")),$(this).data("id"));
		bindActionIcons($(this).data("id"));
		// submit handler 
		//if save is successful replace content with new _display, update div id
	});	

	$(".wiki-here").on("click", function() {
		alert("wiki-here");
		if (checkExisting()) { return };
		insertAfterWiki(getForm(0),$(this).data("id"));
		bindActionIcons(0);
		// submit handler
		//if save is successful replace content with new _display, update div id
	});


	$('[data-toggle="tooltip"]').tooltip();
	// requires in <i>:
	// data-toggle='tooltip' data-placement='left' title='title'
	
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

function insertAfterWiki(formHTML, divID){

	insertHTML = '<div class="panel panel-default wiki-panel" id="0" >'+formHTML+'</div>';
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
			if (divID==0){
				$("#"+divID).remove();
			}else{
				// replace with display
			};
		}		
	});	

	//submit handler
   $('.wiki-form').submit(function(e) {
        e.preventDefault();
     }).validate({

        submitHandler: function(form){

        thisID = $(form.wiki_id).val();

        postURL = "wikis"
        if (thisID!=0)
        	postURL += "/"+thisID

        $.ajax(
            {   url: postURL, 
                method: "post",
                data: { },  //just pass the wiki form array
                error: function() {
                    alert("Unable to save this form.");
                },
                success: function() {
                   getDisplay(thisID)
                }  
            }
        );

        return false;

        }
    });

};

// get the html to display wiki in div
function getDisplay(id) {
	//if new update div id with record id
}