class V1::CommentsController < ApplicationController

  def create
    comment = Comment.new(
        post_id: 1, #placeholder
        user_id: current_user.id,
        body: params[:body],
      )
  end 

  def show 
    comment = Comment.find_by(id: params[:id])
    render json: comment.as_json
  end 

  def update
    comment = Comment.find_by(id: params[:id])
    comment.post = 1, #placeholder
    comment.body = params[:body] || comment.body
    if comment.save
      render json: comment.as_json
    else 
      render json: {errors: comment.errors.full_messages}, status: :bad_request
    end 
  end

  def destroy
    comment = Comment.find_by(id: params[:id])
    comment.destroy
    render json: {message: "comment successfully destroyed!"}
  end 
end


