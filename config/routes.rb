Rails.application.routes.draw do

  root 'home#top'
  get 'home/about'

  resources :posts, only: [:index, :show, :create, :update, :destroy]
    resources :post_commets, only: [:create, :destroy]
    resource :favorites, only: [:create, :destroy]
  resources :users, only: [:show, :edit, :update]
  get 'users/following'
  get 'users/follower'
  get 'users/last_confirm'
  get 'users/please_signin'
  get 'users/thanks'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
