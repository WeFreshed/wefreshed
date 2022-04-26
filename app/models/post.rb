# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  has_many :weactions, dependent: :destroy

  validates :emotion_id, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 4,
    message: 'can only be whole number between 1 and 4.'
  }

  validates :text, presence: true, length: { maximum: 140 }
end
