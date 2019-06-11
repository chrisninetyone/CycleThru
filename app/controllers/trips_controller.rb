class TripsController < ApplicationController
  before_action :set_trip, only: [:edit, :destroy, :show, :update]
  protect_from_forgery
  skip_before_action :authenticate_user!, only: [:create]
  acts_as_token_authentication_handler_for User, only: [ :create]

  def index
    @trips = Trip.all
    authorize @trip
  end

  def show
    authorize @trip
  end

  def new
    @trip = Trip.new
    authorize @trip
  end

  def create
    @trip = Trip.new(trip_params)
    authorize @trip
    @trip.user_id = current_user.id
    @trip.start_long = params["trip"][:start_long]
    @trip.start_lat = params["trip"][:start_lat]
    @trip.end_long = params["trip"][:end_long]
    @trip.end_long = params["trip"][:end_long]

    distance = params["trip"]["distance"]
    distance.slice! "km"
    @trip.distance = distance.to_f

    duration = params["trip"]["duration"]
    # duration.slice! "min"
    @trip.duration = duration.to_f
    if @trip.save
      redirect_to points_path
      # redirect_to trip_path(@trip)
    else
      redirect_to points_path
    end
  end

  def edit
    authorize @trip
  end

  def update
    authorize @trip
    @trip.update(trip_params)
    if @trip.save
      redirect_to trip_path(@trip)
    else
      render :edit
    end
  end

  def destroy
    authorize @trip
    @trip.destroy

    redirect_to trip_path
  end

  private

  def set_trip
    @trip = Trip.find(params[:id])
  end

  def trip_params
    params.require(:trip).permit(:start_long, :start_lat, :end_long, :end_lat)
  end
end
