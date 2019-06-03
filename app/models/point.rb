class Point < ApplicationRecord
  belongs_to :user
  has_many :posts

  validates :lat, presence: true
  validates :long, presence: true
  validates :name, presence: true
  validates :category, presence: true
end
