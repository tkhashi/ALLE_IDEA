class FavoritesController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    favorite = current_user.favorites.new(post_id: post.id)
    favorite.save
    #Ajax利用時はコメントアウト
    #redirect_to post_path(post)  
  end

  def destroy
    post = Post.find(params[:post_id])
    favorite = current_user.favorites.find_by(post_id: post.id)
    favorite.destroy
    #Ajax利用時はコメントアウト
    #redirect_to post_path(post)  
    
  end
end
