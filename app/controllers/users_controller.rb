class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find(params[:id])
    @total_distance = calculate_distance
    authorize @user
  end

  private

  def calculate_distance
    # total km of routes
  end

  def country_name
    country = self.country
    ISO3166::Country[country]
  end

  def country_emoji
    country.emoji_flag
  end
end
