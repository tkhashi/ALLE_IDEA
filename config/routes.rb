Rails.application.routes.draw do

  root 'posts#index'
  get 'home/about'

  devise_for :users
  resources :users, only: [:index, :show, :edit, :update] do
    resources :relationships, only: [:create, :destroy]
    get 'followings'
    get 'followers'
  end
  get 'users/last_confirm'
  get 'users/please_signin'
  get 'users/thanks'
  get 'search' => 'users#search'

  resources :posts, only: [:new, :index, :show, :edit, :create, :update, :destroy] do
    resources :comments, only: [:create, :destroy]
    resource :favorites, only: [:create, :destroy]
  end


end
