class ChangeWikiVersionField < ActiveRecord::Migration
  def change
  	rename_column :wikis, :prev_revision, :version 
  end
end
