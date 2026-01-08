Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'registrations',
    sessions: 'sessions'
  }

  resources :messenger, only: [:create, :index]
  post '/messenger/twilio_callback', to: 'messenger#twilio_callback'

  root to: 'messenger#index'
end
