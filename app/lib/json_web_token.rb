# frozen_string_literal: true

module JsonWebToken
  require 'jwt'
  JWT_SECRET = 'SECRET'

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, JWT_SECRET)
  end

  def self.decode(token)
    body = JWT.decode(token, JWT_SECRET)
    body ? (HashWithIndifferentAccess.new body[0]) : (return false)
  rescue JWT::ExpiredSignature
    false
  rescue JWT::DecodeError
    false
  end
end
