class TripPoint < ApplicationRecord
  belongs_to :trips
  belongs_to :points
end
