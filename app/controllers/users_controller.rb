class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def edit
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
end
