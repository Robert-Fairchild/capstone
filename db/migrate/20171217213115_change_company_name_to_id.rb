class ChangeCompanyNameToId < ActiveRecord::Migration[5.1]
  def change
    remove_column :posts, :company_name, :string
    add_column :posts, :company_id, :integer

  end
end
