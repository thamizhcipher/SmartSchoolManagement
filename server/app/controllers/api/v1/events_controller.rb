class Api::V1::EventsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :require_admin! , except: [:index]

  def index
    events = Event.all
    render json: {events:events},status: :ok
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: {message: "created successfully"}, status: :ok
    else
      render json: {errors: event.error.full_message}, status: :unprocessable_entity
    end
  end

  def update
    event = Event.find_by(id: params[:id])
    if event.update(event_params)
      render json: {message:"event updated successfully"}, status: :ok
    else
      render json: {error: event.error.full_message}, status: :unprocessable_entity
    end
  end

  def destroy
    event = Event.find_by(id: params[:id])
    if event.destroy
      render json: {message:"deleted successfully"}, status: :ok
    else
      render json: {error: event.error.full_message}, status: :unprocessable_entity
    end
    
  end

  private
  def require_admin!
    return render json:{error:"unauthorized"},status: :unauthorized unless current_user.role == "admin"
  end
  def event_params
    params.require(:event).permit(:title,:description,:date,:location)
  end
end
