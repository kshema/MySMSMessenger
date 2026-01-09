class Message
  include Mongoid::Document
  include Mongoid::Timestamps

  field :message_content, type: String
  field :phone_number, type: String
  field :status, type: String, default: 'pending'
  field :sent_at, type: Time
  field :twilio_sid, type: String 

  belongs_to :user
  
  validates :message_content, presence: true, length: { maximum: 250 }
  validates :phone_number, presence: true, format: { with: /\A\+\d{10,15}\z/, message: "Phone number is not valid" }

  def send_message
    begin
      client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
      message = client.messages.create(
        from: ENV['TWILIO_FROM_PHONE_NUMBER'],
        to: phone_number,
        body: message_content,
        status_callback: "#{ENV['BASE_URL']}/messenger/twilio_callback"
      )
      update!(twilio_sid: message.sid)
    rescue StandardError => e
      update(status: 'failed')
      Rails.logger.error("Failed to send message to #{phone_number}: #{e.message}")
    end
  end
end
