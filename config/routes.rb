Rails.application.routes.draw do
  namespace :api do
    get '/sessions', to: 'sessions#index'
    post '/sessions', to: 'sessions#create'
    delete '/sessions', to: 'sessions#destroy'

    post '/posts', to: 'posts#create'
    get '/posts', to: 'posts#index'
    patch '/posts/:id', to: 'posts#update'
    delete '/posts/:id', to: 'posts#destroy'

    post '/weactions', to: 'weactions#create'
  end

  get "/*path" => proc { [200, {}, [ActionView::Base.new.render(file: "public/index.html")]] }
end
