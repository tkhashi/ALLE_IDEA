class Post < ApplicationRecord
  #動画･画像アップローダー用(アップローダークラスとの紐付け)
  mount_uploader :road, RoadUploader
  #acts_as_taggable_on :tags と同じ意味のエイリアス
  acts_as_taggable


  belongs_to :user
  # belongs_to :post_map
  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :maps, dependent: :destroy
  accepts_nested_attributes_for :maps, allow_destroy: true

  validates :body, presence: true


  def favorited_by?(user)
    favorites.where(user_id: user.id).exists?
  end

  def Post.search(search, user_or_post, how_search)
      if how_search == "1"
          Post.where(['body LIKE ?', "%#{search}%"])
      elsif how_search == "2"
          Post.where(['body LIKE ?', "%#{search}"])
      elsif how_search == "3"
          Post.where(['body LIKE ?', "#{search}%"])
      elsif how_search == "4"
          Post.where(['body LIKE ?', "#{search}"])
      else
          Post.all
      end
  end


end

