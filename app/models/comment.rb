class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
end

def as_json
  {
    id: id,
    user_id: user_id,
    post_id: post_id,
    body: body,
    created_at: created_at,
    updated_at: updated_at,
    author: users.user_name

  }
end
