class Post < ApplicationRecord
  belongs_to :user
  # belongs_to :post_map
  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy

  validates :body, presence: true

  @posts_count = Post.count

  def favorited_by?(user)
    favorites.where(user_id: user.id).exists?
  end
end

