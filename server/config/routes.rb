Rails.application.routes.draw do
  devise_for :users,
      path:'',
      path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
      },
      controllers: {
        registrations: 'users/registrations',
        sessions:'users/sessions'
      },
      defaults: {format: :json}
    namespace :api, defaults: { format: :json } do
      namespace :v1 do
        get '/me', to: 'users#me'
        get '/stats', to: 'stats#overview'
        resources :marks, only: [:index, :create]
        resources :courses
        resources :events
      end
    end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
