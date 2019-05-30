class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.string :title
      t.string :message
      t.boolean :read, default: false
      t.integer :notification_type
      t.references :user, foreign_key: true

      t.timestamps
      t.datetime :deleted_at
    end
    add_index :notifications, :deleted_at
  end
end
