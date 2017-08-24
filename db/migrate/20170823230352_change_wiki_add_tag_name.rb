class ChangeWikiAddTagName < ActiveRecord::Migration
  def changewikis
     change_table :recipes do |t|
      t.string :tag_name
    end 	
  end
end
