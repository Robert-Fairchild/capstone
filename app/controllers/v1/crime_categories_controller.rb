class V1::CrimeCategoriesController < ApplicationController

  def index 
    crime_categories = Company.all 

    company_search_terms = params[:company_search]
    if company_search_terms
      crime_categories = crime_categories.where("name ILIKE ?", "%" + company_search_terms + "%")
    end
    render json: crime_categories.as_json
  end 

  def show

    crime_category = Crime_category.find_by(id: params[:id])
    render json: crime_category.as_json


  end 




end




