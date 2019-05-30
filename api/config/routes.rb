Rails.application.routes.draw do

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      # models auth
      resources :addresses,only:[:update,:show]
      get 'addresses/:id/get_close_barrage' => 'addresses#get_close_barrage'
      resources :users, except: [:edit, :new, :index, :destroy], shallow: true do
        member do
          put :password
          put :register_device
        end
        collection do
          namespace :auth do
            put 'omniauth/:provider' => 'omniauth#all'
            patch 'omniauth/:provider' => 'omniauth#all'
            post 'sign_in' => 'sessions#create'
            delete 'sign_out' => 'sessions#destroy'
            post 'passwords' => 'passwords#create'
            patch 'passwords' => 'passwords#update'
            put 'passwords' => 'passwords#update'
          end
          post :reset_password
        end
      end
    end
  end

  namespace :admin, defaults: {format: 'json'} do
    resources :barrages
  end


  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
