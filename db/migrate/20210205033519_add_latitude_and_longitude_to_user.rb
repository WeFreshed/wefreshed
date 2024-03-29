# frozen_string_literal: true

class AddLatitudeAndLongitudeToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :latitude, :float
    add_column :users, :longitude, :float
  end
end
