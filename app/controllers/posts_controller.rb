class PostsController < ApplicationController
  def new
    @post_new = Post.new
  end


  def create
    @post_new = Post.new(post_params)
    @post_new.user_id = current_user.id
    if @post_new.save
      redirect_to post_path(@post_new.id)
    else
      @posts = Post.all
      render "index"
    end
  end

  def index
    @posts = Post.all
  end

  def show
    @post_new = Post.new
    @posts = Post.all
    @post = Post.find(params[:id])
    @comment = Comment.new
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to post_path(current_user.id)
    else
      @posts = Post.all
      render "index"
    end
  end

  private
  def post_params
    params.require(:post).permit(:body)
  end

end
