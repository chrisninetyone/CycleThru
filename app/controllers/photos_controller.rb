class PhotosController < ApplicationController

  def index
    @photo = Photo.all
    authorize @photo
  end

  def show
    @photo = Photo.find(params[:id])
    authorize @photo
  end

  def new
    @photo = Photo.new
    authorize @photo
  end

  def create
    @photo = Photo.new(photo_params)
    @post = Post.find(params[:post_id])
    @photo.post = @post
    authorize @photo

    if @photo.save
      redirect_to point_path
    else
      render :new
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    authorize @photo
  end
end
