# frozen_string_literal: true

module Api
  class SessionsController < ApplicationController
    before_action only: %i[destroy index] do
      authenticate_cookie
    end

    def destroy
      user = current_user
      if user
        cookies.delete(:jwt)
        render json: { status: 'OK', code: 200 }
      else
        render json: { status: 'session not found', code: 404 }
      end
    end

    def index
      if current_user
        render json: init_data(current_user)
      else
        render json: { errors: 'no' }, status: :unauthorized
      end
    end

    def create
      device_id = params['device_id']
      if device_id
        user, token = User.handle_login(device_id).values_at(:user, :token)
        if user
          cookies.signed[:jwt] = {
            value: token,
            httponly: true,
            same_site: Rails.env.to_sym == :production ? :none : :lax,
            secure: Rails.env.to_sym == :production
          }
          render json: init_data(user)
        else
          render json: { error: 'incorrect credentials' }, status: :unprocessable_entity
        end
      else
        render json: { error: 'incorrect credentials' }, status: :unauthorized
      end
    end

    private

    def init_data(user)
      {
        user: user.as_json(only: %i[id name]),
        posts: user.posts.as_json(only: %i[id text latitude longitude emotion_id is_active])
      }
    end
  end
end
