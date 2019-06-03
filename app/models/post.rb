class Post < ApplicationRecord
  belongs_to :points
  belongs_to :user
  has_many :photos

  validates :title, presence: true
  validates :content, presence: true
end
