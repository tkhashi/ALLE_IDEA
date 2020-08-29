class CreatePostMaps < ActiveRecord::Migration[5.2]
  def change
    create_table :post_maps do |t|
      t.integer :post_id
      t.integer :map_id

      t.timestamps
    end
  end
end
