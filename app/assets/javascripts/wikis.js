$(document).ready(function() {

  $(".sidebar-toggle").click(function() {
    // alert("You clicked me!")

    $("#mySidenav").toggleClass("sidenav-collapsed sidenav-open");
    $("#main").toggleClass("main-open main-collapsed");
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

function insertAfterWiki(wikiHTML, parentID, newID){

	insertHTML = '<div class="panel panel-default wiki-panel" id="'+newID+'" >'+wikiHTML+'</div>';
	$("#"+parentID).after(insertHTML);
	$("#wiki_parent").val(parentID);

};

// function showAfterWiki(wikiID, openerID){

// 	$("#"+openerID).after(getWiki(wikiID));
// 	bindDisplayActionIcons()	

// };

function editInPlace(formHTML, divID){

	insertHTML = '<div class="panel panel-default wiki-panel" id="'+divID+'" >'+formHTML+'</div>'
	$("#"+divID).replaceWith(insertHTML);

};

function checkExisting(){
	if ($("#0").length != 0) {
		alert("You must save or cancel any new wiki before you can create a new one.");
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
	});

	$(".tag-delete").on("click", function() {
		//alert("line 106");
		alert("removing tag "+$(this).data("tag")+" from "+$(this).data("wiki"))		
		
		  $.ajax(
		    {   url: "/wiki_tags/delete_wiki_tag", 
		        method: "post",
		        data: {"wiki_id": $(this).data("wiki"), tag_id: $(this).data("tag") }
		    })
		    .success(function(){$(this).remove();})
		    .fail(function(){ alert("Failed to delete tag.")});	})

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
		insertAfterWiki(getForm(0),$(this).data("id"),"0");
		bindEditActionIcons(0);

	});

	$(".btn-tag").click(function() {

		var tagWiki = $(this).data("tag-id");
		var thisWiki = $(this).data("this-id");

		if ($("#"+tagWiki).length != 0) {
			$('html,body').animate({ scrollTop: $("#"+tagWiki).offset().top-70});
		} else {
			insertAfterWiki(getWiki(tagWiki),thisWiki,tagWiki);
		};	
	});

	$("#wiki-delete").on("click", function() {
		if(confirm("Are you sure you want to delete this wiki?")){
			$("#"+$(this).data("id")).remove();
			// just remove for now, eventually move to archive
		}		
	});

	$('[data-toggle="tooltip"]').tooltip();

}	

function reDisplayWiki(id){

	var wiki = getWiki(id);
	$("#"+id).html(wiki);
	bindDisplayActionIcons();

}; //reDisplay

function getWiki(id){
  $.ajax(
    {   url: "/wikis/re_display", 
        method: "get",
        data: {"wiki_id": id }, 
        dataType: "html" ,
        async: false
    })
    .done(function(data){wikiHTML = data})
    .fail(function(){ alert("Failed to retreive wiki.")});	

    return wikiHTML
};