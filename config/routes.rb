Rails.application.routes.draw do

  #ホーム
  root 'home#top'
  get 'home/about'

  #devise
  devise_for :users
  #ユーザー
  resources :users, only: [:index, :show, :edit, :update] do
    #フォローページ
    get 'followings'
    get 'followers'
    #フォロー(リレーションシップ)
    resources :relationships, only: [:create, :destroy]
  end
  get 'users/last_confirm'
  get 'users/please_signin'
  get 'users/thanks'

  #投稿
  resources :posts, only: [:new, :index, :show, :create, :update, :destroy] do
    resources :post_commets, only: [:create, :destroy]
    resource :favorites, only: [:create, :destroy]
  end


end
