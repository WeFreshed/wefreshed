# frozen_string_literal: true

class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :weactions, dependent: :destroy

  has_many :weactor_weefs, dependent: :destroy, class_name: 'Weef', foreign_key: 'weactor_id', inverse_of: :weactor
  has_many :weactee_weefs, dependent: :destroy, class_name: 'Weef', foreign_key: 'weactee_id', inverse_of: :weactee

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

  def weefs
    weactee_weefs + weactor_weefs
  end
end
