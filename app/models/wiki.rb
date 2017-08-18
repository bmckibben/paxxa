class Wiki < ActiveRecord::Base
	has_one :user, foreign_key: "author_id"
end
