class CreateBarrages < ActiveRecord::Migration[5.2]
  def change
    create_table :barrages do |t|
      t.string :name
      t.string :description
      t.float :range
      t.float :size
      t.string :image
      t.string :lat
      t.string :lng

      t.timestamps
      t.datetime :deleted_at
    end
    add_index :barrages, :deleted_at
  end
end
