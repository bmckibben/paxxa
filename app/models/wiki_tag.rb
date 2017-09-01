class WikiTag < ActiveRecord::Base
   belongs_to :wiki
   belongs_to :tag, :foreign_key => "tag_id", :class_name => "Wiki"
end
