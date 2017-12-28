class V1::UsersController < ApplicationController
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



end

