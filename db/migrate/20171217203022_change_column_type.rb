class ChangeColumnType < ActiveRecord::Migration[5.1]
  def change
    change_column :posts, :crime_category_id, "numeric USING CAST(crime_category_id AS numeric)"
    change_column :posts, :crime_category_id, :integer
  end
end
