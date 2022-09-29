# frozen_string_literal: true

module Api
  class WeactionsController < ApplicationController
    before_action :authenticate_cookie

    def create
      weaction = Weaction.new(weaction_params.except(:poster_id))
      if weaction.save
        is_weef = weaction.is_match ? weaction.weef?(weaction_params[:poster_id]) : false
        render json: { weaction_id: weaction.id, is_weef: is_weef }
      else
        render json: weaction.errors.full_messages
      end
    end

    private

    def weaction_params
      params
        .require(:weaction)
        .permit(:post_id, :direction, :poster_id)
        .merge(
          user_id: current_user.id,
          emotion_id: emotion_id_from_direction,
          poster_id: params[:poster_id]
        )
    end

    def emotion_id_from_direction
      return 1 if params[:direction] == 'up'
      return 2 if params[:direction] == 'down'
      return 3 if params[:direction] == 'left'
      return 4 if params[:direction] == 'right'
    end
  end
end
