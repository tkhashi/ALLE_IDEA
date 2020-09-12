class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :name, presence: true
  validates :name, length: { in: 2..20 }
  validates :profile, length: { maximum: 50 }

  #動画･画像アップローダー用(アップローダークラスとの紐付け)
  mount_uploader :avatar, AvatarUploader

  #諸々のアソシエーション
  has_many :posts, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorite_posts, through: :favorites, source: :post
  has_many :comments, dependent: :destroy

  #自己完結アソシエーション(フォローモデル)
  has_many :relationships
  has_many :followings, through: :relationships, source: :follow
  has_many :reverse_of_relationships, class_name: "Relationship", foreign_key: "follow"
  has_many :followers, through: :reverse_of_relationships, source: :user

  #フォロー機能
  def follow(other_user)
    unless self == other_user
      self.relationships.find_or_create_by(follow_id: other_user.id)
    end
  end

  def unfollow(other_user)
    relationship = self.relationships.find_by(follow_id: other_user.id)
    relationship.destroy if relationship
  end

  def following?(other_user)
    self.followings.include?(other_user)
  end

  #検索機能
    def User.search(search, user_or_post, how_search)
        if user_or_post == "1"
            if how_search == "1"
                    User.where(['name LIKE ?', "%#{search}%"])
            elsif how_search == "2"
                    User.where(['name LIKE ?', "%#{search}"])
            elsif how_search == "3"
                    User.where(['name LIKE ?', "#{search}%"])
            elsif how_search == "4"
                    User.where(['name LIKE ?', "#{search}"])
            else
                    User.all
            end
        end
    end

end

