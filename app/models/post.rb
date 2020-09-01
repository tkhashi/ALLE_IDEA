class Post < ApplicationRecord
  belongs_to :post
  belongs_to :post_map

  validates :body, presence: true

  @posts_count = Post.count
end
