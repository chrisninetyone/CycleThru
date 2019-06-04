Rails.application.routes.draw do

  devise_for :users
  root to: 'pages#home'

  # get 'profile', to: 'pages#profile', as: :profile
  # get 'about', to: 'pages#about', as :about
  resources :user, only: [:show]
  resources :trips, only: [:show, :new, :create, :update]
  resources :points, only: [:index, :show, :new, :create] do
    resources :posts, only: [:new, :create, :update, :edit, :delete]
  end
end
