class ModifyRevisionType < ActiveRecord::Migration
  def change
    add_column :wikis, :last_revision, :integer
  end
end
