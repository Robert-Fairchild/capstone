class CrimeCategory < ApplicationRecord
  has_many :posts

  def as_json

    {
      id: id,
      name: name,
      description: description,
      number_of_posts: number_of_posts,
      created_at: created_at,
      updated_at: updated_at,
      posts: posts.as_json
    }

  end
end
