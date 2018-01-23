class V1::UsersController < ApplicationController
  

  def index 

    users = User.all
    render json: users.as_json

  end




  def create
    user = User.new(
      user_name: params[:user_name], 
      first_name: params[:first_name],
      email: params[:email],
      felon: params[:felon],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if user.save
      render json: {status: 'User created successfully'}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end
  end

  def update 
    user = User.find_by(id: params[:id])
    user.user_name = params[:user_name] || user.user_name
    user.first_name = params[:first_name] || user.first_name
    user.email = params[:email] || user.email
    user.felon = params[:felon] || user.felon
    user.password = params[:password] || user.password
    user.password_confirmation[:password_confirmation] || user.password_confirmation
    user.save
    render json: user.as_json
  end 

  def destroy
    user = user.find_by(id: params[:id])
    user.destroy
    render json: {message: "User successfully deleted!"}
  end
end

