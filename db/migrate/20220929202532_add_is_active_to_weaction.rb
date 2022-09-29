class AddIsActiveToWeaction < ActiveRecord::Migration[6.1]
  def change
    add_column :weactions, :is_active, :boolean, default: true
  end
end
