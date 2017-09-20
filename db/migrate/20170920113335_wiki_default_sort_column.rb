class WikiDefaultSortColumn < ActiveRecord::Migration
  def change
  	add_column :wikis, :default_sort, :integer, :null => false, :default => 0
  end
end
