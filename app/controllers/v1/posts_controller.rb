class V1::PostsController < ApplicationController

  def index 
    posts = Post.all.order(:id => :asc)
    render json: posts.as_json
  end 

  def create
    post = Post.new(
      title: params[:title],
      # company: params[:company.name],
      crime_category_id: 1,
      user_id: 1,
      company_id: 1,
      body: params[:body]
    )
    if post.save
      render json: post.as_json
    else
      render json: {errors: post.errors.full_messages}, status: :bad_request
    end
  end

  def show 
    post = Post.find_by(id: params[:id])
    render json: post.as_json
  end

  def update
    post = Post.find_by(id: params[:id])
    post.name = params[:name] || post.name
    post.company_id = params[:company_id] || post.company_id
    post.body = params[:body] || post.body
    post.save
    render json: post.as_json
  
  end

  def destroy
    post = Post.find_by(id: params[:id])
    post.destroy
    render json: {message: "Post successfully destroyed!"}
  end
end

