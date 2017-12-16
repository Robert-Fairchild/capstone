class AddColumnToCompany < ActiveRecord::Migration[5.1]
  def change
    add_column :companies, :number_of_posts, :integer
  end
end
