module JsonWebToken
  require 'jwt'
  JWT_SECRET = 'SECRET'.freeze

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, JWT_SECRET)
  end

  def self.decode(token)
    body = JWT.decode(token, JWT_SECRET)
    body ? (HashWithIndifferentAccess.new body[0]) : (return false)
  rescue JWT::ExpiredSignature, JWT::VerificationError => e
    false
  rescue JWT::DecodeError, JWT::VerificationError => e
    false
  end
end
