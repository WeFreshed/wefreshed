class User < ApplicationRecord
  has_many :posts
  has_many :weactions

  validates :device_id, presence: true, allow_nil: false
  validates :device_id, uniqueness: true

  def self.handle_login(device_id)
    user = User.find_or_create(device_id)
    if user
      token = JsonWebToken.encode({ user_id: user.id }, 4.hours.from_now)
      return { user: user, token: token }
    else
      return { user: false, token: false }
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
