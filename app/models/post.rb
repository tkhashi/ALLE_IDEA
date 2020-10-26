class Post < ApplicationRecord
  #動画･画像アップローダー用(アップローダークラスとの紐付け)
  mount_uploader :road, RoadUploader
  #acts_as_taggable_on :tags と同じ意味のエイリアス
  acts_as_taggable
  belongs_to :user
  #諸々のアソシエーション
  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :maps, dependent: :destroy
  accepts_nested_attributes_for :maps, allow_destroy: true
  #自己完結アソシエーション(通知モデル)
  has_many :notifications, dependent: :destroy
  #諸々のバリデーション
  validates :body, presence: true
  validates :road, presence: true
  validates :body, length: { maximum: 200 }

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

#イイネ通知
  def create_notification_favorite!(current_user)
    # すでに「いいね」されているか検索
    temp = Notification.where(["visitor_id = ? and visited_id = ? and post_id = ? and action = ? ", current_user.id, user_id, id, 'favorite'])
    # いいねされていない場合のみ、通知レコードを作成
    if temp.blank?
      notification = current_user.active_notifications.new(
        post_id: id,
        visited_id: user_id,
        action: 'favorite'
      )
      # 自分の投稿に対するいいねの場合は、通知済みとする
      if notification.visitor_id == notification.visited_id
        notification.checked = true
      end
      notification.save if notification.valid?
    end
  end
  #コメント通知
  def create_notification_comment!(current_user, comment_id)
    # 自分以外にコメントしている人をすべて取得し、全員に通知を送る
    temp_ids = Comment.select(:user_id).where(post_id: id).where.not(user_id: current_user.id).distinct
    temp_ids.each do |temp_id|
      save_notification_comment!(current_user, comment_id, temp_id['user_id'])
    end
    # まだ誰もコメントしていない場合は、投稿者に通知を送る
    save_notification_comment!(current_user, comment_id, user_id) if temp_ids.blank?
  end
  def save_notification_comment!(current_user, comment_id, visited_id)
    # コメントは複数回することが考えられるため、１つの投稿に複数回通知する
    notification = current_user.active_notifications.new(
      post_id: id,
      comment_id: comment_id,
      visited_id: visited_id,
      action: 'comment'
    )
    # 自分の投稿に対するコメントの場合は、通知済みとする
    if notification.visitor_id == notification.visited_id
      notification.checked = true
    end
    notification.save if notification.valid?
  end

end

