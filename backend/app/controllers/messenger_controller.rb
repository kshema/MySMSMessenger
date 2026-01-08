class MessengerController < ApplicationController
    before_action :authenticate_user!

    def index
        if current_user.nil?
            render json: { error: 'User not authenticated' }, status: :unauthorized
            return
        end

        messages = current_user.messages.all.order(created_at: :desc)
        render json: messages, status: :ok
    end

    def create
        message = current_user.messages.new(message_params)
        if message.save
            message.send_message
            render json: { status: 'Message sent' }, status: :created
        else
            render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def twilio_callback
        message_sid = params['MessageSid']
        message_status = params['MessageStatus']
        message = Message.where(twilio_sid: message_sid).first
        if message
            message.update(status: message_status, sent_at: Time.now) if message_status == 'sent'
            head :ok
        else
            render json: { error: 'Message not found' }, status: :not_found
            head :not_found
        end
    end

    private
    def message_params
        params.require(:message).permit(:message_content, :phone_number)
    end
end
