class CreateWikiTags < ActiveRecord::Migration
  def change
    create_table :wiki_tags, id: false do |t|
      t.integer :wiki_id
      t.integer :tag_id

      t.index :wiki_id
      t.index :tag_id
    end
  end
end
