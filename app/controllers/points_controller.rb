class PointsController < ApplicationController
  before_action :set_point, only: [:edit, :show, :update]

  def index
    @point = Point.all
    authorize @point
  end

  def show
    authorize @point
  end

  def new
    @point = Point.new
    authorize @point
  end

  def create
    @point = Point.new(point_params)
    authorize @point
    @point.user_id = current_user.id
    if @point.save
      redirect_to point_path(@point)
    else
    render :new
  end

  def edit
    authorize @point
  end

  def update
    authorize @point
    @point.update(point_params)
    if @point.save
      redirect_to point_path(@point)
    else
      render :edit
  end

  private

  def set_point
    @point = Point.find(params[:id])
  end

  def point_params
    params.require(:point).permit(:long, :lat, :name, :category)
  end
end
