https://github.com/mongoid/echo

rails generate scaffold wikis title:string author:integer body:text parent:integer revision:boolean deleted:boolean

rails generate scaffold tags name:string 

rails generate scaffold fields name:string

rails generate scaffold wiki_tag_links wiki_id:integer tag_id:integer

rails generate scaffold wiki_field_links wiki_id:integer field_id:integer value:string
