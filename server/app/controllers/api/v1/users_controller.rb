class Api::V1::UsersController < ApplicationController
  include RackSessionsFix
  respond_to :json
  before_action :authenticate_user!
  
  def me
    render json: {
      user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    }, status: :ok
  end
end
