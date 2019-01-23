# == Schema Information
#
# Table name: section_notes
#
#  id         :integer          not null, primary key
#  note       :text
#  section_id :integer
#  created_at :datetime
#  updated_at :datetime
#
# Indexes
#
#  index_section_notes_on_section_id  (section_id)
#

class SectionNote < ActiveRecord::Base
  belongs_to :section
end
