class CreateWeefs < ActiveRecord::Migration[6.1]
  def change
    create_table :weefs do |t|
      t.boolean :is_active, default: true
      t.references :weactor, null: false
      t.references :weactee, null: false

      t.timestamps
    end
  end
end
