class PostsController < ApplicationController
  def new
    post = Post.new
  end

  def create
    post = Post.new
    if post.save
      redirect_to post_path(current_user.id)
    else
      redirect_to posts_path
  end

  def index
    @posts = Post.all
  end

  def show
    post = Post.new
    @posts = Post.all
    @post = Post.find(params[:id])
  end

  def edit
    @post = Post.find(params[:id])
  end
end
