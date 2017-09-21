module WikisHelper

  def nested_set(nested_set_query,link_class, parent_id)

    current_level = 1
    first_item = true
      
    menu = "<ul class='nav nav-list'>"
    tree_toggler = "<i class='tree-toggler nav-header fa fa-chevron-right' aria-hidden='true'></i>"

    nested_set_query.each do |link|
      if !link.id.nil? and !link.path.nil?
      if current_level < link.path.length
        menu += " <ul class='nav nav-list tree'>"
      elsif current_level > link.path.length
        menu += "</li></ul>" * (current_level-link.path.length)
      elsif !first_item  
        menu += "</li>"
      else  
        first_item = false
      end
      menu += "<li>#{tree_toggler}<a href='javascript:void(0);' data-wiki-id='#{link.id}' data-parent-id='#{parent_id}' class='#{link_class}'>#{link.title}</a>"
      current_level = link.path.length
      end
    end  

    menu += "</li>"
    menu += ("</ul>" * current_level)

    return menu

  end

    def query_menu
      Wiki.find_by_sql("WITH RECURSIVE category_tree(id, path) AS (

      select wikis.id, ARRAY[wikis.id]
      from wikis left outer join wiki_tags on wikis.id = wiki_tags.wiki_id
      where wiki_tags.tag_id is null and (wikis.deleted is null or wikis.deleted is false)

      UNION ALL
      SELECT wiki_tags.wiki_id as id, path || wiki_tags.wiki_id
      FROM category_tree
      JOIN wiki_tags ON wiki_tags.tag_id=category_tree.id
      WHERE NOT wiki_tags.wiki_id = ANY(path)
      )


      SELECT category_tree.*, wikis.title 
      FROM category_tree 
            RIGHT OUTER JOIN wikis on category_tree.id = wikis.id
      ORDER BY path")
    end  

    def query_toc(id)
      Wiki.find_by_sql("WITH RECURSIVE category_tree(id, path) AS (

      select wikis.id, ARRAY[wikis.id]
      from wikis left outer join wiki_tags on wikis.id = wiki_tags.wiki_id
      where wiki_tags.tag_id = #{id} and (wikis.deleted is null or wikis.deleted is false)
      UNION ALL
      SELECT wiki_tags.wiki_id as id, path || wiki_tags.wiki_id
      FROM category_tree
      JOIN wiki_tags ON wiki_tags.tag_id=category_tree.id
      WHERE NOT wiki_tags.wiki_id = ANY(path)
      )


      SELECT category_tree.*, wikis.title 
      FROM category_tree 
          JOIN wikis on category_tree.id = wikis.id
      ORDER BY path")
    end 


end
