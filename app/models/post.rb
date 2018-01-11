class Post < ApplicationRecord
  has_many :comments
  belongs_to :user
  belongs_to :crime_category
  belongs_to :company

  def as_json
    {
      id: id,
      user_id: user_id,
      title: title,
      body: body,
      crime_category_id: crime_category_id,
      created_at: created_at,
      company: company.as_json,
      crime_category: crime_category.as_json,
      user: user.as_json
    }
  end
end
