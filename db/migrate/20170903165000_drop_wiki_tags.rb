class DropWikiTags < ActiveRecord::Migration
  def change
  	drop_table :wiki_tags if ActiveRecord::Base.connection.table_exists? 'wiki_tags'
  end
end
