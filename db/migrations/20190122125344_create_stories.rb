class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.text :title
      t.text :subtitle
      t.string :abbreviated_title
      t.text :short_summary
      t.text :long_summary
      t.integer :word_count

      t.timestamps
    end
  end
end
