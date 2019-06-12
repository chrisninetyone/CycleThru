class PointsController < ApplicationController
  before_action :set_point, only: [:edit, :show, :update]

  def index
    @all_points = Point.all
    @point = Point.new
    authorize @point

    @points = Point.where.not(lat: nil, long: nil)

    @markers = @points.map do |point|
      marker_image = categories(point)
      {
        lat: point.lat,
        lng: point.long,
        image_url: marker_image,
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
    if @point.save
      @marker = {
          lat: @point.lat,
          lng: @point.long,
          image_url: categories(@point)
          # infoWindow: render_to_string(partial: "map_points", locals: { point: @point })
        }
      respond_to do |format|
        format.html { redirect_to points_path }
        format.js
      end
    else
      # respond_to do |format|
      #   format.html { render 'points/index' }
      #   format.js
      # end
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

  def categories(point)
    if point.category == "Bike Stop"
      marker_image = helpers.asset_url('tools.png')
    elsif point.category == "Camping"
      marker_image = helpers.asset_url('tent.png')
    elsif point.category == "Food"
      marker_image = helpers.asset_url('cutlery.png')
    elsif point.category == "Photo"
      marker_image = helpers.asset_url('camera.png')
    elsif point.category == "Wellness"
      marker_image = helpers.asset_url('holistic.png')
    end
    marker_image
  end

  def set_point
    @point = Point.find(params[:id])
  end

  def point_params
    params.require(:point).permit(:long, :lat, :name, :category, :description, :photo)
  end
end
