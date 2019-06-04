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
    authorize @post
  end

  def create
    @post = Post.new(post_params)
    @point = Point.find(params[:id])
    @post.point = @point
    authorize @post

    @post.user_id = current_user.id
    if @post.save
      redirect_to point_path
    else
      render :new
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
    params.require(:post).permit(:title, :content)
  end
end
