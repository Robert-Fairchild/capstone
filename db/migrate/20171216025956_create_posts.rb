class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.string :title
      t.string :crime_category
      t.string :company_name
      t.string :body

      t.timestamps
    end
  end
end
