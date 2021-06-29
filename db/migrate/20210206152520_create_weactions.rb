# frozen_string_literal: true

class CreateWeactions < ActiveRecord::Migration[6.1]
  def change
    create_table :weactions do |t|
      t.integer :post_id
      t.integer :user_id
      t.integer :emotion_id

      t.timestamps
    end
  end
end
