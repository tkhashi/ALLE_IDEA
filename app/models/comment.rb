class Comment < ApplicationRecord
  #諸々のアソシエーション
  belongs_to :post
  belongs_to :user
  #自己完結アソシエーション(通知モデル)
  has_many :notifications, dependent: :destroy
  #諸々のバリデーション
  validates :comment, presence: true
end
