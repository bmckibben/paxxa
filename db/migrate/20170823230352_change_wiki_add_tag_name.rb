class ChangeWikiAddTagName < ActiveRecord::Migration
  def change
     change_table :wikis do |t|
      t.string :tag_name
    end 	
  end
end
