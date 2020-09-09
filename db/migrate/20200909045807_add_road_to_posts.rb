class AddRoadToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :road, :string
  end
end
