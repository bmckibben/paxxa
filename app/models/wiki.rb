class Wiki < ActiveRecord::Base
	belongs_to :user
	
	# gnarly many to many self join
	has_many :wiki_tags
	has_many :tags, through: "wiki_tags", :foreign_key => "tag_id", :class_name => "Wiki"
end
