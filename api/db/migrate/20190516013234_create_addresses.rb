class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :name
      t.string :zip_code
      t.string :city_name
      t.string :street
      t.string :number
      t.string :complement
      t.string :neighborhood
      t.references :user, foreign_key: true
      t.string :uf_name
      t.string :country
      t.decimal :lat, {:precision=>10, :scale=>6}
      t.decimal :lng, {:precision=>10, :scale=>6}

      t.timestamps
      t.datetime :deleted_at
    end
    add_index :addresses, :deleted_at
  end
end
