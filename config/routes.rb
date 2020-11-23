Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'home#top'
  get 'home/about'

  devise_for :users
  devise_scope :user do
    post 'users/guest_sign_in', to: 'users/sessions#new_guest'
  end
  resources :users, only: [:index, :show, :edit, :update] do
    resources :relationships, only: [:create, :destroy]
    get 'followings'
    get 'followers'
  end

  resources :posts, only: [:new, :index, :show, :edit, :create, :update, :destroy] do
    resources :comments, only: [:create, :destroy]
    resource :favorites, only: [:create, :destroy]
  end

  get 'latlngsearch/:lat/:lng' => 'posts#search', constraints: { lat: /\d+\.\d+/, lng: /\d+\.\d+/ }
  #通知
  resources :notifications, only: :index
  #ユーザー･投稿検索
  get 'search' => 'users#search'


end
