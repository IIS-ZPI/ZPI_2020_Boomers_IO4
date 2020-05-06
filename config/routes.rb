Rails.application.routes.draw do
  resources :categories,:defaults => { :format => :json } do
    resources :products,:defaults => { :format => :json }
  end
  resources :products, only: :index,:defaults => { :format => :json }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'app#index'
end
