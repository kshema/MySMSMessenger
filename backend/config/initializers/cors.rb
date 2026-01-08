Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:4200' # Use the exact domain without a trailing slash
      resource '*',
               headers: :any,
               methods: %i[get post put patch delete options head],
               expose: %w[Authorization] # Use %w[] for strings instead of symbols
    end
  end