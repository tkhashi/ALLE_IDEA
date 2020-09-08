class UsersController < ApplicationController
  before_action :set_find, only: [:show, :edit, :update]
  before_action :set_all, only: [:index, :show]


  def index
  end

  def show
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

  def last_confirm
  end

  def please_signin
  end

  def thanks
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
