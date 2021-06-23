class AddIsMatchToWeaction < ActiveRecord::Migration[6.1]
  def change
    add_column :weactions, :is_match, :boolean, default: false
  end
end
