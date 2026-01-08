Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'registrations',
    sessions: 'sessions'
  }

  resources :messenger, only: [:create, :index]
  post '/messenger/twilio_callback', to: 'messenger#twilio_callback'

  # Serve the Angular app for all other routes
  get '*path', to: 'application#frontend', constraints: ->(req) { !req.xhr? && req.format.html? }

  root to: 'messenger#index'
end
