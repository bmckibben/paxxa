Rails.application.routes.draw do

  resources :admins
  devise_for :users
  root 'home#index'

  get 'static_pages/about', :as => 'static_about'
  get 'static_pages/help', :as => 'static_help'
  get 'static_pages/contact', :as => 'static_contact'
  get 'static_pages/meditation', :as => 'static_meditation'  
  get 'static_pages/startrek', :as => 'static_startrek'
  get 'static_pages/title', :as => 'static_title'
  get 'static_pages/summary', :as => 'static_summary'
  get 'wikis/wiki_form' => 'wikis#wiki_form'
  get 'wikis/re_display' => 'wikis#re_display'

  resources :wikis

end
