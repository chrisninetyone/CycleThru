class PostsController < ApplicationController
  before_action :set_post, only: [:edit, :show, :update, :destroy]

  # def index
  #   @post = Post.all?
  #   authorize @post
  # end

  # def show
  #   authorize @post
  # end

  def new
    @post = Post.new
    @point = Point.find(params[:point_id])
    authorize @post
  end

  def create
    @post = Post.new(post_params)
    @point = Point.find(params[:point_id])
    @post.user = current_user
    @post.point_id = @point.id
    authorize @post
    if params[:photos].nil?
    else
      save_photos
    end
    @post.user_id = current_user.id

    if @post.save
      respond_to do |format|
        format.html { redirect_to point_path(@point) }
        format.js
      end
    else
      respond_to do |format|
        format.html { render 'points/show' }
      end
    end
  end

  def edit
    authorize @post
  end

  def update
    authorize @post
    @post.update(post_params)
    if @post.save
      redirect_to point_path(@post.point)
    else
      render :edit
    end
  end

  def destroy
    @point = @post.point
    authorize @post
    respond_to do |format|
      format.html { redirect_to point_path(@point) }
      format.js
    end
    @post.destroy
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :content, :photos =>[])
  end

  def save_photos
    params[:photos].each do |image|
      photo = Photo.new
      photo.image = image
      @post.photos << photo
      photo.save
    end
  end
end
