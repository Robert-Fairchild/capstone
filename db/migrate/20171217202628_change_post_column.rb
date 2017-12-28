class ChangePostColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :posts, :crime_category, :crime_category_id
  end
end
