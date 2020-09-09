class ChangeDateLatlngToMaps < ActiveRecord::Migration[5.2]
  def change
    change_column :maps, :longitude, :double
    change_column :maps, :latitude, :double
  end
end
