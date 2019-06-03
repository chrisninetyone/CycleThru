class Trip < ApplicationRecord
  belongs_to :user
  has_many :trippoints
  has_many :points, through: :trippoints

  validates :start_long, presence: true
  validates :start_lat, presence: true
  validates :end_long, presence: true
  validates :end_lat, presence: true
end
