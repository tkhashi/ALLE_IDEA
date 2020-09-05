class RemovePostMapsIdFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :post_maps_id, :integer
  end
end
