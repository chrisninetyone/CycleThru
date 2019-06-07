Rails.application.routes.draw do

  # devise_for :users, :controllers => { :registrations => :registrations }

  devise_for :users,
    controllers: { omniauth_callbacks: 'users/omniauth_callbacks', :registrations => :registrations }

  root to: 'pages#home'

  # get 'profile', to: 'pages#profile', as: :profile
  # get 'about', to: 'pages#about', as :about
  resources :users, only: [:show]
  resources :trips, only: [:show, :new, :create, :update, :edit, :delete]
  resources :points, only: [:index, :show, :new, :create, :edit, :update] do
    resources :posts, only: [:new, :create, :update, :edit, :delete]
  end
end
