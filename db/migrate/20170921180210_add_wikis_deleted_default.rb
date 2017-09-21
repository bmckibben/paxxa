class AddWikisDeletedDefault < ActiveRecord::Migration
  def change
  	change_column :wikis, :deleted, :boolean, :default => false
  end
end
