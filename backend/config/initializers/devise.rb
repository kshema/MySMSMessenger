Devise.setup do |config|
  # Use the secret key for Devise
  config.secret_key = Rails.application.credentials.secret_key_base

  # Mailer configuration
  config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'

  # Load and configure the ORM
  require 'devise/orm/mongoid'

  # Authentication keys configuration
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]

  config.navigational_formats = []
  
  # Skip session storage for HTTP authentication
  config.skip_session_storage = [:http_auth]

  # Password configuration
  config.stretches = Rails.env.test? ? 1 : 12
  config.password_length = 6..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/

  # Rememberable configuration
  config.expire_all_remember_me_on_sign_out = true

  # Confirmable configuration
  config.reconfirmable = true

  # Reset password configuration
  config.reset_password_within = 6.hours

  # Sign out configuration
  config.sign_out_via = :delete

  # JWT configuration
  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.secret_key_base
    puts "JWT Secret: #{jwt.secret}"
    jwt.dispatch_requests = [
      ['POST', %r{^/users/sign_in$}]
    ]
    jwt.revocation_requests = [
      ['DELETE', %r{^/users/sign_out$}]
    ]
    jwt.expiration_time = 24.hours.to_i
  end

  Warden::JWTAuth.configure do |config|
    puts "Warden JWT Secret: #{config.secret}"
  end
end