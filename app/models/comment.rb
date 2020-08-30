class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validate :comment, presence: true
end
