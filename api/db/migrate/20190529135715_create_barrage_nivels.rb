class CreateBarrageNivels < ActiveRecord::Migration[5.2]
  def change
    create_table :barrage_nivels do |t|
      t.references :barrage
      t.float :moisture
      t.float :vibration

      t.timestamps
      t.datetime :deleted_at
    end
    add_index :barrage_nivels, :deleted_at
  end
end
