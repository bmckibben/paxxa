json.extract! wiki, :id, :title, :user_id, :body, :parent, :revision, :deleted, :created_at, :updated_at
json.url wiki_url(wiki, format: :json)
