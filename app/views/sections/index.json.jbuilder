json.array!(@sections) do |section|
  json.extract! section, :id, :title, :sequence, :summary, :body, :throughline, :resolution, :conflict
  json.url section_url(section, format: :json)
end
