class HomeController < ApplicationController
  def top
    @posts = Post.all.order(created_at: :desc)
    @map = Map.all          #Mapの全レコード
    @arr=[]                  #空の配列
    @map.each do |m|        # m はMapのレコード
      @arr.push({lat: m.latitude, lng: m.longitude })
    if user_signed_in?
      redirect_to posts_path and return
    end
    end
  end

  def about
  end

  private
  def home_params
    params.require(:post).permit(:body, :road, :tag_list,
                                  maps_attributes: [:latitude,
                                                    :longitude])
  end
end
