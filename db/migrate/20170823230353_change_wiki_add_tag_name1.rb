class ChangeWikiAddTagName1 < ActiveRecord::Migration
  def change
     change_table :wikis do |t|
      t.string :tag_name
    end 	
  end
end
