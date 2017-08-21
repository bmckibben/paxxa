class Admin < ActiveRecord::Base
	self.table_name = "users"
	as_enum :role, reader: 1, editor: 2, author: 3, administrator: 4
end
