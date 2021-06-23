class Weaction < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates :emotion_id, :post_id, :user_id, presence: true
  validates :user_id, numericality: { only_integer: true }
  validates :emotion_id, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 4,
    message: 'can only be whole number between 1 and 4.'
  }

  after_create :update_is_match

  def update_is_match
    return unless match?

    self.is_match = true
    save
  end

  def match?
    emotion_id == post.emotion_id
  end

  def weef?(post)
    matched_weaction = Weaction.joins("INNER JOIN posts ON weactions.post_id = posts.id WHERE weactions.is_match = 't' AND weactions.is_active = 't' AND weactions.user_id = #{post.user_id} AND posts.user_id = #{user_id}").first || false

    if !matched_weaction
      return false
    end

    weef = Weef.create(weactor_id: id, weactee_id: matched_weaction.id)
    matched_weaction.update(is_active: false, weef_id: weef.id)
    update(is_active: false, weef_id: weef.id)

    return true
  end
end
