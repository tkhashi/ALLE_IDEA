class Post < ApplicationRecord
  #動画･画像アップローダー用(アップローダークラスとの紐付け)
  mount_uploader :road, RoadUploader

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
end

