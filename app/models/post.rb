class Post < ApplicationRecord
  has_many :comments
  belongs_to :user
  belongs_to :crime_category
  belongs_to :company
end
