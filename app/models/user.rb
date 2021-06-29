# frozen_string_literal: true

class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :weactions, dependent: :destroy

  validates :device_id, presence: true, allow_nil: false

  def self.handle_login(device_id)
    user = User.find_or_create(device_id)
    if user
      token = JsonWebToken.encode({ user_id: user.id }, 4.hours.from_now)
      { user: user, token: token }
    else
      { user: false, token: false }
    end
  end

  def self.find_or_create(device_id)
    user = User.find_by(device_id: device_id)
    unless user
      user = User.new(device_id: device_id, name: '')
      user.save
    end
    user
  end
end
