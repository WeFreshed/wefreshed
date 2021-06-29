# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :text
      t.integer :user_id
      t.integer :emotion_id
      t.float :latitude
      t.float :longitude
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
