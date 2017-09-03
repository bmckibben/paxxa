class CreateWikiTags2 < ActiveRecord::Migration
  def change
    create_table :wiki_tags do |t|
      t.integer :wiki_id
      t.integer :tag_id

      t.index :wiki_id
      t.index :tag_id
    end
  end
end
