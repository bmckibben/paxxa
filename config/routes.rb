Rails.application.routes.draw do

  devise_for :users
  root 'home#index'

  get 'static_pages/about', :as => 'static_about'
  get 'static_pages/help', :as => 'static_help'
  get 'static_pages/contact', :as => 'static_contact'
  get 'static_pages/teachings', :as => 'static_teachings'
  get 'static_pages/startrek', :as => 'static_startrek'
  get 'static_pages/title', :as => 'static_title'
  get 'static_pages/summary', :as => 'static_summary'
 
  resources :wikis
  resources :admins
end
