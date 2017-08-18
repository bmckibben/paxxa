class CreateWikis < ActiveRecord::Migration
  def change
    create_table :wikis do |t|
      t.string :title
      t.integer :user_id
      t.text :body
      t.integer :parent
      t.boolean :revision
      t.boolean :deleted

      t.timestamps null: false
    end
  end
end
