class V1::CrimeCategoriesController < ApplicationController

  def index 
    crime_categories = CrimeCategory.all 

    crime_category_search = params[:company_search]
    if crime_category_search
      crime_categories = crime_categories.where("name ILIKE ?", "%" + crime_category_search + "%")
    end
    render json: crime_categories.as_json
  end 

  def show

    crime_category = CrimeCategory.find_by(id: params[:id])
    render json: crime_category.as_json


  end 




end




