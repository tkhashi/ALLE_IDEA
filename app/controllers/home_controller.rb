class HomeController < ApplicationController
  def top
    @posts = Post.all.order(created_at: :desc)
    @map = Map.all          #Mapの全レコード
    @arr=[]                  #空の配列
    @map.each do |m|        # m はMapのレコード
      @arr.push({lat: m.latitude, lng: m.longitude })
    end
  end

  def about
  end
end
