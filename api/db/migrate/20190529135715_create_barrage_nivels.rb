class CreateBarrageNivels < ActiveRecord::Migration[5.2]
  def change
    create_table :barrage_nivels do |t|
      t.references :barrage
      t.float :moisture, default: 0.0
      t.float :vibration, default: 0.0

      t.timestamps
      t.datetime :deleted_at
    end
    add_index :barrage_nivels, :deleted_at
  end
end
