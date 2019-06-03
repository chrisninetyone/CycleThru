class Trip < ApplicationRecord
  belongs_to :user
  has_many :trippoints
  has_many :points, through: :trippoints
end
