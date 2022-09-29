# frozen_string_literal: true

class Weef < ApplicationRecord
  belongs_to :weactor, class_name: 'User'
  belongs_to :weactee, class_name: 'User'
end
