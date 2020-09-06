class Post < ApplicationRecord
  belongs_to :user
  # belongs_to :post_map
  has_many :comments, dependent: :destroy

  validates :body, presence: true

  @posts_count = Post.count
end

