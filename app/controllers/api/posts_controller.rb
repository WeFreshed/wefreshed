# frozen_string_literal: true

module Api
  class PostsController < ApplicationController
    before_action :authenticate_cookie

    def create
      post = Post.new(post_params)
      if post.save
        render json: post.as_json(only: %i[id text latitude longitude emotion_id is_active])
      else
        render json: post.errors.full_messages
      end
    end

    def index
      posts = Post.all
      render json: posts
    end

    def update
      post = Post.find(params[:id])
      if post.update(post_params)
        render json: post.as_json(only: %i[id text latitude longitude emotion_id is_active])
      else
        render json: post.errors.full_messages
      end
    end

    def destroy
      post = Post.find(params[:id])
      render json: post
    end

    private

    def post_params
      params.require(:post).permit(:text, :emotion_id, :latitude, :longitude,
                                   :is_active).merge(user_id: current_user.id)
    end
  end
end
