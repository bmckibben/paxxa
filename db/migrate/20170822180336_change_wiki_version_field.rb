class ChangeWikiVersionField < ActiveRecord::Migration
  def change
  	rename_column :wikis, :revision, :version 
  end
end
