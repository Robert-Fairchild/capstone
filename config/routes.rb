Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  namespace :v1 do 
    
    get "/users" => "users#index"
    post "/users" => "users#create"
    patch "/users/:id" => "users#update"
    get "/users/:id" => "users#show"
    delete "/users/:id" => "users#delete"
    
    get "/posts" => "posts#index"
    post "/posts" => "posts#create"
    get "/posts/:id" => "posts#show"
    patch "/posts/:id" => "posts#update"
    delete "/posts/:id" => "posts#delete"

    get "/companies" => "companies#index"
    post "/companies" => "companies#create"
    get "/companies/:id" => "companies#show"
    patch "/companies/:id" => "companies#update"
    delete "/companies/:id" => "companies#delete"


    get "/crime_categories" => "crime_categories#index"
    post "/crime_categories" => "crime_categories#create"
    get "/crime_categories/:id" => "crime_categories#show"
    patch "/crime_categories/:id" => "crime_categories#update"
    delete "/crime_categories/:id" => "crime_categories#delete"

    get "/comments" => "comments#index"
    post "/comments" => "comments#create"
    get "/comments/:id" => "comments#show"
    patch "/comments/:id" => "comments#update"
    delete "/comments/:id" => "comments#delete"

  end
end

