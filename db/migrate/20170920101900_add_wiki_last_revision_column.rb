class AddWikiLastRevisionColumn < ActiveRecord::Migration
  def change
  	add_column :wikis, :last_revision, :integer, :null => false, :default => 0
  end
end
