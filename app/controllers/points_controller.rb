class PointsController < ApplicationController
  def index
    @points = Point.where.not(lat: nil, long: nil)

    @markers = @points.map do |point|
      {
        lat: point.lat,
        lng: point.long,
        # image_url: helpers.asset_url('../assets/images/cycling_marker_1.png')
      }
    end
  end

  def show
  end
end
