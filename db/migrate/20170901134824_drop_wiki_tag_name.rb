class DropWikiTagName < ActiveRecord::Migration
  def change
  	remove_column :wikis, :tag_name
  end
end
