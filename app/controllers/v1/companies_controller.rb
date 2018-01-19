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


  def glassdoor
    input_company = params[:company]
    user_ip = request.remote_ip
    user_agent = "Chrome/63.0.3239.132"
    response = Unirest.get("http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=#{ENV['PARTNER_ID']}&t.k=#{ENV['GLASSDOOR_KEY']}&action=interviews&q=#{input_company}&userip=#{user_ip}&useragent=#{user_agent}")
    render json: response.body
  end

# q=pharmaceuticals&






end
