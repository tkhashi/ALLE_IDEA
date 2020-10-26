class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:show, :followings, :followers]
  before_action :set_find, only: [:show, :edit, :update]
  before_action :set_all, only: [:index, :show]


  def index
  end

  def show
    @favorite_posts=@user.favorite_posts
    @notifications = current_user.passive_notifications.page(params[:page]).per(20)
    @notifications.where(checked: false).each do |notification|
      notification.update_attributes(checked: true)
    end
    @visitor_ex_current_user= @notifications.where.not(visitor_id: current_user.id)
  end

  def edit
    if @user.id != current_user.id
      redirect_to user_path(current_user)
    end
  end

  def update
    if @user.update(user_params)
      flash[:success] = "会員情報が変更されました。"
      redirect_to user_path(current_user)
    else
      render "edit"
    end
  end

  def followings
    @user = User.find(params[:user_id])
    @users = @user.followings
  end

  def followers
    @user = User.find(params[:user_id])
    @users = @user.followers
  end

  def search
    @user_or_post = params[:option]
    @how_search = params[:choice]
    if @user_or_post == "1"
      @users = User.search(params[:search], @user_or_post, @how_search)
    else
      @posts = Post.search(params[:search], @user_or_post, @how_search)
    end
  end

  private
  #======共通化=======
    def set_find
      @user = User.find(params[:id])
    end

    def set_all
      @users = User.all
    end
  #==================

    def user_params
      params.require(:user).permit(:name, :profile, :avatar)
    end
end
