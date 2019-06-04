class PhotosController < ApplicationController

  def index
    @photo = Photo.all
  end

  def show
    @photo = Photo.find(params[:id])
  end

  def create
    @photo = Photo.new(photo_params)
    @post = Post.find(params[:id])
    @photo.post = @post
    authorize @photo

    if @photo.save
      redirect_to point_path
  end

  def destroy
    @photo = Photo.find(params[:id])
  end
end
