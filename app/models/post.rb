class Post < ApplicationRecord
  belong_to :post
  belong_to :post_map

  validates :body, presence: true
end
