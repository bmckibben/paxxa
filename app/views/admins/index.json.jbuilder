json.array!(@users) do |user|
  json.extract! user, :id, :id, :username, :first_name, :last_name, :created_at, :updated_at, :role_cd
  json.url user_url(user, format: :json)
end
