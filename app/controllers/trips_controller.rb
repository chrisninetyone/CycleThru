class TripsController < ApplicationController
  before_action :set_trip, only: [:edit, :destroy, :show, :update]

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
    raise
    @trip = Trip.new(trip_params)
    authorize @trip
    @trip.user_id = current_user.id
    if @trip.save
      redirect_to points_path
      # redirect_to trip_path(@trip)
    else
      render :new
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
