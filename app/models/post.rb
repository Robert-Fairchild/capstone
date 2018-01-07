class Post < ApplicationRecord
  has_many :comments
  belongs_to :user
  belongs_to :crime_category
  belongs_to :company

  def as_json
    {
      id: id,
      title: title,
      body: body,
      company: company.as_json,
      crime_category: crime_category.as_json,
    }
  end
end
