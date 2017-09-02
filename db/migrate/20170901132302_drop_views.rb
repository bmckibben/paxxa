class DropViews < ActiveRecord::Migration
  def change
  	drop_table :views if ActiveRecord::Base.connection.table_exists? 'views'
  end
end
