class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json
  private
  # def resource_name
  #   :user
  # end
  # def sign_up_params
  #   params.require(:user).permit(:email,:password)
  # end

  def respond_with(current_user, _opts = {})
    puts(params[:user])
    if resource.persisted?
      render json: {
        status: {code: 200, message: 'Signed up successfully.'},
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }, status: :ok
    else
       render json: {
        error: current_user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end
