class AddPostIdToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :post_id, :integer
  end
end
