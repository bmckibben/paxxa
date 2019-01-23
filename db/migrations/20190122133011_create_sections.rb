class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :title
      t.integer :sequence
      t.text :summary
      t.text :body
      t.string :throughline
      t.text :resolution
      t.text :conflict
      t.references :story, index: true

      t.timestamps
    end
  end
end
