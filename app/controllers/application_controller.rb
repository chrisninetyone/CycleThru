class ApplicationController < ActionController::Base
  before_action :store_user_location!, if: :storable_location?
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  include Pundit

  private

  def after_sign_in_path_for(resource)
    return points_path
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :bio, :avatar])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :avatar, :bio])
  end

  def storable_location?
    request.get? && is_navigational_format? && !devise_controller? && !request.xhr?
  end

  def store_user_location!
    store_location_for(:user, request.fullpath)
  end

  def default_url_options
  { host: ENV["http://cyclethru.herokuapp.com"] || "localhost:3000" }
  end
end
