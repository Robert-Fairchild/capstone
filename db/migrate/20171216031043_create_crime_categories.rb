class CreateCrimeCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :crime_categories do |t|
      t.string :name
      t.string :description
      t.integer :number_of_posts

      t.timestamps
    end
  end
end
