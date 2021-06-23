class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate_cookie
    info = decoded_token
    user = User.find_by(id: info['user_id']) if info
    render json: { error: 'unauthorized' }, status: :unauthorized unless user
    user
  end

  def current_user
    info = decoded_token
    user = User.find_by(id: info['user_id']) if info
    user
  end

  def decoded_token
    token = cookies.signed[:jwt]
    JsonWebToken.decode(token)
  end
end
