class PointsController < ApplicationController
  before_action :set_point, only: [:edit, :show, :update]

  def index
    @point = Point.all
    authorize @point

    @points = Point.where.not(lat: nil, long: nil)

    @markers = @points.map do |point|
      {
        lat: point.lat,
        lng: point.long,
        image_url: helpers.asset_url('cycling_marker_2.png'),
        infoWindow: render_to_string(partial: "map_points", locals: { point: point })
      }
    end
  end

  def show
    @posts = Post.where(:point_id == params[:id])
    @post = Post.new
    authorize @point
  end

  def new
    @point = Point.new
    @lat = params[:lat]
    @long = params[:long]
    authorize @point
  end

  def create
    @point = Point.new(point_params)
    authorize @point
    @point.user_id = current_user.id
    @point.lat = params[:lat]
    @point.long = params[:long]
    if @point.save
      redirect_to points_path
    else
    render :new
    end
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
  end

  private

  def set_point
    @point = Point.find(params[:id])
  end

  def point_params
    params.require(:point).permit(:long, :lat, :name, :category, :description, :photo)
  end
end

