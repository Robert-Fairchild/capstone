class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :description
      t.boolean :hire_felons

      t.timestamps
    end
  end
end
