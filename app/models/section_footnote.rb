# == Schema Information
#
# Table name: section_footnotes
#
#  id         :integer          not null, primary key
#  footnote   :text
#  section_id :integer
#  created_at :datetime
#  updated_at :datetime
#
# Indexes
#
#  index_section_footnotes_on_section_id  (section_id)
#

class SectionFootnote < ActiveRecord::Base
  belongs_to :section
end
