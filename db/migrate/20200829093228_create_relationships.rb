class CreateRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :relationships do |t|
      t.string :user
      t.references :user, foreign_key: true
      t.references :follow, foreign_key: true: { to_table: :users}

      t.timestamps

      t.index [:user_id, :follow_id], unique: true
    end
  end
end
