class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
end

def as_json
  {
    id: id,
    body: body,
    created_at: created_at,
    updated_at: updated_at,
    post: {

      post_id: post.post_id




    }

  }
end
