class V1::CompaniesController < ApplicationController

  def index 
    companies = Company.all 

    company_search_terms = params[:company_search]
    if company_search_terms
      companies = companies.where("name ILIKE ?", "%" + company_search_terms + "%")
    end
    render json: companies.as_json
  end 

  def show

    company = Company.find_by(id: params[:id])
    render json: company.as_json


  end 




end
