class PostsController < ApplicationController
  before_action :set_post, only: [:edit, :show, :update, :destroy]

  def index
    @post = Post.all?
    authorize @post
  end

  def show
    authorize @post
  end

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
    params[:photos].each do |image|
      photo = Photo.new
      photo.image = image
      @post.photos << photo
      photo.save
    end
    @post.user_id = current_user.id
    if @post.save
      redirect_to point_path(@point)
    else
      render :new
    end
  end

  def edit
    authorize @post
  end

  def update
    authorize @post
    @post.update(post_params)
    if @post.save
      redirect_to point_path(@point)
    else
      render :edit
    end
  end

  def destroy
    authorize @post
    @post.destroy

    redirect_to point_path(@point)
  end

  private

  def set_post
    params.require(:post).permit(:title, :content)
  end

  def post_params
    params.require(:post).permit(:title, :content, :photos =>[])
  end
end
