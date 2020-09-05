class UsersController < ApplicationController
  before_action :set_find, only: [:show]
  before_action :set_all, only: [:index, :show]


  def index
  end

  def show
  end

  def edit
  end

  def update
  end

  def following
  end

  def follower
  end

  def last_confirm
  end

  def please_signin
  end

  def thanks
  end


  private
    def set_find
      @user = User.find(params[:id])
    end

    def set_all
      @users = User.all
    end
end
