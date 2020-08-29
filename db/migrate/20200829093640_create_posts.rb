class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.integer :post_maps_id
      t.string :body

      t.timestamps
    end
  end
end
