class PostsController < ApplicationController
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
    if params[:tag_name]
      @posts = Post.tagged_with("#{params[:tag_name]}")
    end
    @map = Map.all          #Mapの全レコード
    @arr=[]                  #空の配列
    @map.each do |m|        # m はMapのレコード
      @arr.push({lat: m.latitude, lng: m.longitude })
    end
    @user = current_user
    @favorite_posts = @user.favorite_posts
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
