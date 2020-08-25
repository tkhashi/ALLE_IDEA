Rails.application.routes.draw do
  get 'posts/new'
  get 'posts/index'
  get 'posts/show'
  get 'posts/edit'
  get 'users/show'
  get 'users/edit'
  get 'users/following'
  get 'users/follower'
  get 'users/last_confirm'
  get 'users/please_signin'
  get 'users/thanks'
  get 'home/top'
  get 'home/about'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
