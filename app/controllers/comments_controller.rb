class CommentsController < ApplicationController
  before_action :authenticate_user!
  def create
    @post = Post.find(params[:post_id])
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.post_id = @post.id
    commenter=@comment.post
    if @comment.save
      commenter.create_notification_comment!(current_user, @comment.id)
      redirect_to post_path(@post)
    end
  end

  def destroy
    byebug
    comment = Comment.find_by(id: params[:id], post_id: params[:post_id])
    comment.destroy
    redirect_to post_path(params[:post_id])
  end

  private
  def comment_params
    params.require(:comment).permit(:comment)
  end
end
