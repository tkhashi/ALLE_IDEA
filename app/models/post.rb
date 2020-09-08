class Post < ApplicationRecord
  belongs_to :user
  # belongs_to :post_map
  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy

  validates :body, presence: true


  def favorited_by?(user)
    favorites.where(user_id: user.id).exists?
  end
end

