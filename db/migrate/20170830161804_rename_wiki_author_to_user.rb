class RenameWikiAuthorToUser < ActiveRecord::Migration
  def change
  	rename_column :wikis, :author, :user_id 
  end
end
