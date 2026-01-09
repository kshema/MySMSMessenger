require 'rails_helper'

RSpec.describe MessengerController, type: :controller do
  include Devise::Test::ControllerHelpers

  let(:mock_user) do
    instance_double(
      'User',
      id: 1,
      email: 'test@example.com',
      password: 'password',
      messages: double('MessageAssociation', all: double('AllMessages', order: [mock_message]))
    )
  end

  let(:mock_message) do
    instance_double(
      'Message',
      id: 1,
      message_content: 'Hello',
      phone_number: '1234567890',
      status: 'pending',
      twilio_sid: '12345',
      save: true,
      send_message: nil,
      errors: double('Errors', full_messages: ["Message content can't be blank"])
    )
  end

  before do
    allow(request.env['warden']).to receive(:authenticate!).and_return(mock_user)
    allow(controller).to receive(:current_user).and_return(mock_user)
  end

  describe 'GET #index' do
    context 'when user is authenticated' do
      before do
        get :index
      end

      it 'returns a 200 status code' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when user is not authenticated' do
      before do
        allow(request.env['warden']).to receive(:authenticate!).and_throw(:warden, scope: :user)
        get :index
      end

      it 'returns a 401 status code' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #create' do
    let(:valid_params) { { message: { message_content: 'Hello', phone_number: '1234567890' } } }
    let(:invalid_params) { { message: { message_content: '', phone_number: '' } } }

    context 'when user is authenticated' do
      before do
        allow(mock_user.messages).to receive(:new).and_return(mock_message)
      end

      it 'creates a message with valid params' do
        allow(mock_message).to receive(:save).and_return(true)
        post :create, params: valid_params
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)['status']).to eq('Message sent')
      end

      it 'does not create a message with invalid params' do
        allow(mock_message).to receive(:save).and_return(false)
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['errors']).to include("Message content can't be blank")
      end
    end

    context 'when user is not authenticated' do
      before do
        allow(request.env['warden']).to receive(:authenticate!).and_throw(:warden, scope: :user)
        post :create, params: valid_params
      end

      it 'returns a 401 status code' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #twilio_callback' do
    let(:twilio_params) { { 'MessageSid' => '12345', 'MessageStatus' => 'sent' } }

    context 'when the message exists' do
      before do
        allow(Message).to receive(:where).with(twilio_sid: twilio_params['MessageSid']).and_return([mock_message])
        allow(mock_message).to receive(:update).with(status: twilio_params['MessageStatus'], sent_at: instance_of(Time)).and_return(true)
        post :twilio_callback, params: twilio_params
      end

      it 'updates the message status' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the message does not exist' do
      before do
        allow(Message).to receive(:where).with(twilio_sid: twilio_params['MessageSid']).and_return([])
        post :twilio_callback, params: twilio_params
      end

      it 'returns a 404 status code' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end