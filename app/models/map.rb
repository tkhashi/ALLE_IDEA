class Map < ApplicationRecord
  belongs_to :post


validates :latitude, presence: true
validates :longitude, presence: true

end
