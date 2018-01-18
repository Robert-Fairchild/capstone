class Post < ApplicationRecord
  has_many :comments
  belongs_to :user
  belongs_to :crime_category
  belongs_to :company

  def as_json
    {
      id: id,
      
      title: title,
      body: body,
      crime_category_id: crime_category_id,
      company_id: company_id,
      created_at: created_at,
      company: 
        {
          id: company.id,
          name: company.name,
          description: company.description,
          hire_felons: company.hire_felons,
          number_of_posts: company.number_of_posts,
          created_at: company.created_at,
          updated_at: company.updated_at,
        },
      crime_category: 
      
      {
      id: id,
      name: crime_category.name,
      description: crime_category.description,
      number_of_posts: crime_category.number_of_posts,
      created_at: crime_category.created_at,
      updated_at: crime_category.updated_at,
      }
      
    }
  end
end
