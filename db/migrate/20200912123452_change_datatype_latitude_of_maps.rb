class ChangeDatatypeLatitudeOfMaps < ActiveRecord::Migration[5.2]
  def change
    change_column :maps, :latitude, :float, limit: 53
    change_column :maps, :longitude, :float, limit: 53
  end
end
