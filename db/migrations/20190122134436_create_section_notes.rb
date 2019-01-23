class CreateSectionNotes < ActiveRecord::Migration
  def change
    create_table :section_notes do |t|
      t.text :note
      t.references :section, index: true

      t.timestamps
    end
  end
end
