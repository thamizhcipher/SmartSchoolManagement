class Users::SessionsController < Devise::SessionsController
  include RackSessionsFix
  wrap_parameters false
  respond_to :json
   skip_before_action :verify_signed_out_user, only: :destroy
  
  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.valid_password?(params[:user][:password])
      sign_in(user)
      render json: {
      status: { 
        code: 200, message: 'Logged in successfully.',
        data: { 
            user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        }
      }
    }, status: :ok
    else
      render json: {
        error: "Invalid email or password"
      }, status: :unauthorized
    end
  end


  def respond_to_on_destroy
    auth_header = request.headers['Authorization']
    if auth_header.present?
      token = auth_header.split(' ').last
      jwt_payload = JWT.decode(
      token,
      Rails.application.credentials.devise[:jwt_secret_key]
    ).first

    current_user = User.find(jwt_payload['sub'])
    if current_user
      render json: { message:"Logged out successfully" }, status: :ok
      return
    else
      render json: { message:"Logout failed" }, status: :unauthorized
      return
    end
    end
    render json: {message: "Timed out! Refresh the page"}, status: :unauthorized
  end
end
