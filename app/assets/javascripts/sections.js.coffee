#= require ckeditor/init

$(document).on 'page:load ready', ->
  if $('textarea#section_body').length > 0
    data = $('textarea#section_body')
    $.each data, (i) ->
      CKEDITOR.replace data[i].id
      return      
  return