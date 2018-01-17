class Company < ApplicationRecord
  has_many :posts
  
  def as_json
    {
      id: id,
      name: name,
      description: description,
      hire_felons: hire_felons,
      number_of_posts: number_of_posts,
      created_at: created_at,
      updated_at: updated_at,
      posts: posts.as_json
    }

  end
end
