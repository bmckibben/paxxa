Rails.application.routes.draw do

  devise_for :users
  root 'wikis#index'

  get 'static_pages/about', :as => 'static_about'
  get 'static_pages/help', :as => 'static_help'
  get 'static_pages/contact', :as => 'static_contact'
  get 'static_pages/meditation', :as => 'static_meditation'  
  get 'static_pages/startrek', :as => 'static_startrek'
  get 'static_pages/title', :as => 'static_title'
  get 'static_pages/summary', :as => 'static_summary'
  get 'static_pages/novels', :as => 'static_novels'
  get 'static_pages/moderation', :as => 'static_moderation'
  get 'static_pages/sisyphus', :as => 'static_sisyphus'
  get 'wikis/wiki_form' => 'wikis#wiki_form'
  get 'wikis/re_display' => 'wikis#re_display'
  get 'wikis/test' => 'wikis#test'
  get 'wikis/wikilist' => 'wikis#wikilist'
  get 'wikis/search' => 'wikis#search'
  post 'wiki_tags/delete_wiki_tag' => 'wiki_tags#delete_wiki_tag'
  post 'wikis/wiki_disable' => 'wikis#wiki_disable'
  post 'wiki_tags/new_wiki_tag' => 'wiki_tags#new_wiki_tag'
  get 'wiki_tags/menu' => 'wiki_tags#menu'
  get 'users/whoami' => 'users#whoami'

  resources :wikis
  resources :users
  resources :wiki_tags
  resources :admins
end
