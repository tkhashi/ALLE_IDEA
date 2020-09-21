class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:show, :search]


  def new
    @post_new = Post.new
    @post_new.maps.build
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
    @posts = Post.all.order(created_at: :desc)
    @post_new = Post.new
    @post_new.maps.build
    @post_new.user_id = current_user.id
    user = current_user
    @favorite_posts = user.favorite_posts
    #タグ用
    if params[:tag_name]
      @posts = Post.tagged_with("#{params[:tag_name]}")
    end
    #マップ用
    @map = Map.all          #Mapの全レコード
    @arr=[]                  #空の配列
    @map.each do |m|        # m はMapのレコード
      @arr.push({lat: m.latitude, lng: m.longitude })
    end
    ##クリックしたマーカーのコンテンツ
  end

  #マップマーカークリック時に投稿データを引っ張り出すアクション
  def search
    maps = Map.where(latitude: params[:lat]).where(longitude: params[:lng])
    @marker_arr =[]
    maps.each do |map|
      @marker_arr.push(map.post)
    end
   # #同一緯度経度に投稿があった場合が考慮されていない。下記の要領で対応できるか?
   # @map_posts = []
   # maps.each do |map|
   #   # @map_posts.push(map.post)
   #   @map_posts.push(map.post.id)
   # end
   # # @posts = map.post
  end

  def show
    @post_new = Post.new
    @post_new.maps.build
    @posts = Post.all
    @post = Post.find(params[:id])
    @comment = Comment.new
    @map = Map.all          #Mapの全レコード
    @arr=[]                  #空の配列
    @map.each do |m|        # m はMapのレコード
      @arr.push({lat: m.latitude, lng: m.longitude })
    end

    @user = @post.user
    @favorite_posts=@user.favorite_posts
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

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to posts_path
  end

  private
  def post_params
    params.require(:post).permit(:body, :road, :tag_list,
                                  maps_attributes: [:latitude,
                                                    :longitude])
  end

end
