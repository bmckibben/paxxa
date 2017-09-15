$(document).ready(function() {

  $(".sidebar-toggle").click(function() {

    $("#mySidenav").toggleClass("sidenav-collapsed sidenav-open");
    $("#main").toggleClass("main-open main-collapsed");
    $(".sidebar-toggle").toggleClass("fa-chevron-right fa-chevron-left");

  });

	bindDisplayActionIcons();
	bindSidebarActions();

	$('[data-toggle="tooltip"]').tooltip();
	// requires in <i>:
	// data-toggle='tooltip' data-placement='left' title='title'

}) //document.ready

// helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function checkExisting(check_id){

	if (check_id=="0" && $("#"+check_id).length != 0)  {
		// edit a wiki but there is alerady a form open
		alert("You must save or cancel any new wiki before you can create a new one.");
		return true;
	} else if ($("#"+check_id).length != 0) {	
		return true;
	};
	return false;
};

// display wikis --------------------------------------------------------------

// get and display wiki in existing div 
function reDisplayWiki(id){

	var wiki = getWiki(id);
	$("#"+id).html(wiki);
	bindDisplayActionIcons();

}; //reDisplay


function editInPlace(formHTML, divID){

	insertHTML = '<div class="panel panel-default wiki-panel" id="'+divID+'" >'+formHTML+'</div>'
	$("#"+divID).replaceWith(insertHTML);

}; //editInPlace


function insertAtTop(formHTML,divID){

	insertHTML = '<div class="panel panel-default wiki-panel" id="'+divID+'" >'+formHTML+'</div>';
	$(".wiki-panel:first").before(insertHTML);
	bindDisplayActionIcons();

};	//insertAtTop

function insertAfterWiki(wikiHTML, parentID, divID, parentName){

	insertHTML = '<div class="panel panel-default wiki-panel" id="'+divID+'" >'+wikiHTML+'</div>';
	$("#"+parentID).after(insertHTML);
	$("#wiki_parent").val(parentID);
	addTagToTray(parentID,0,parentName);
	bindDisplayActionIcons();

}; //insertAfterWiki


function addTagToTray(id, tag_id, tagName){

	if (tagName != ""){
		var tagAnchor = "<a href='javascript:void(0)' class='btn  tag-delete' data-tag='"+id+"' data-wiki='"+tag_id+"' data-toggle='tooltip' data-placement='bottom' title='Remove this tag.'> <i aria-hidden='false' class='fa fa-trash' ></i> " + tagName + "</a>";
		$("#tag-tray").append(tagAnchor);

	};
};

// click binders ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function bindDisplayActionIcons() {
	$("#wiki-new").on("click", function() {

		if (checkExisting("0")) { return };		
		insertAtTop(getForm(0),0);
		bindEditActionIcons(0);

	});
	
	$("#wiki-new-journal").on("click", function() {

		if (checkExisting("0")) { return };		
		insertAtTop(getForm(0,"j"),0);
		bindEditActionIcons(0);

	});


	$(".wiki-edit").on("click", function() {

		if (checkExisting("0")) { return };
		editInPlace(getForm($(this).data("id")),$(this).data("id"));
		bindEditActionIcons($(this).data("id"));

	});	

	$(".wiki-here").on("click", function() {

		if (checkExisting("0")) { return };
		insertAfterWiki(getForm(0),$(this).data("id"),"0",$(this).data("parent"));
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

	$(".wiki-remove").on("click", function() {
			$("#"+$(this).data("id")).remove();	
	});	

	$('[data-toggle="tooltip"]').tooltip();

}	

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
		
		deleteTag($(this))

	});

	$('#add-tag').click(function () {
		var tag_id = $('#input-tag').val();
		var wiki_id = $(this).data("wiki-id");
		var tag_name = $('#tag_list [value="'+tag_id+'"]').text();

		addTag( wiki_id, tag_id, tag_name);
	});	

	$(".wiki-delete").on("click", function() {
		if(confirm("Are you sure you want to delete this wiki?")){
			$("#"+$(this).data("id")).remove();
			// just remove for now, eventually move to archive
		}		
	});

	$('[data-toggle="tooltip"]').tooltip();	

}

function bindSidebarActions() {


    $('i.tree-toggler').click(function () {
        $(this).parent().children('ul.tree').toggle(300);
        $(this).toggleClass('fa-chevron-right fa-chevron-down')
    });

    $(".tree").hide();

    $('a.tree-menu').click(function () {

        if (checkExisting($(this).data('wiki-id'))) {
        	// view a wiki already on the page
        	$('html,body').animate({ scrollTop: $("#"+$(this).data('wiki-id')).offset().top-70});
        } else {
        	// view a wiki not on the page
			insertAtTop(getWiki($(this).data('wiki-id')), $(this).data('wiki-id'));
			bindDisplayActionIcons();
        }
    });



}

// ajax functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

function getForm(id,wiki_type){

var form;

  $.ajax(
    {   url: "/wikis/wiki_form", 
        method: "get",
        data: {"wiki_id": id, "wiki_type": wiki_type }, 
        dataType: "html" ,
        async: false
    })
    .done(function(data){form = data})
    .fail(function(){ alert("Failed to retreive form.")});
    return form;

}; //getForm

function deleteTag(tag) {
	$.ajax(
	{   url: "/wiki_tags/delete_wiki_tag", 
	    method: "post",
	    data: {"id":tag.data("tag") }
	})
	.success(function(){tag.remove();})
	.fail(function(){ alert("Failed to delete tag.")});
}; // deleteTag

function addTag(wiki_id,tag_id,tag_name) {
	var id = 0;
	$.ajax(
	{   url: "/wiki_tags/new_wiki_tag", 
	    method: "post",
	    data: {"wiki_id":wiki_id, "tag_id":tag_id }
	})
	.success(function(data){
		id = data;
		addTagToTray(id, tag_id, tag_name);
		$("#input-tag").val("");
	})
	.fail(function(){ alert("Failed to add tag.")});
	return id;
}; // deleteTag
