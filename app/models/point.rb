class Point < ApplicationRecord
  belongs_to :user
  has_many :posts, dependent: :destroy

  # mount_uploader :photo, PhotoUploader

  validates :lat, presence: true
  validates :long, presence: true
  validates :name, presence: true
  validates :category, presence: true
end
