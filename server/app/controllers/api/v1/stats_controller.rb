class Api::V1::StatsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :require_admin!

  def overview
    student_count = User.where(role: 'student').count
    teacher_count = User.where(role: 'teacher').count
    render json: {
      students: student_count,
      teachers: teacher_count
    }, status: :ok
  end

  private

  def require_admin!
    unless current_user.role == 'admin'
      render json: { error: "unauthorized"}, status: :unauthorized
    end
  end


end
