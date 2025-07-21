class Api::V1::MarksController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :require_admin_or_teacher!

  def index
    marks = User.where(role: 'student').includes(:marks).map do |student|
      {
        student_id:student.id,
        student_name:student.email,
        marks: student.marks.map{ |m| {subject: m.subject, score: m.score} }
      }
    end
    render json: marks,status: :ok
  end

  def create
    student = User.find_by(id: params[:user_id], role: 'student')
    return render json: {error:"student not found"}, status: :not_found unless student

    mark = student.marks.build(mark_params)
    if mark.save
      render json: {message: "Marks added successfully"}, status: :created
    else
      render json: {errors: mark.errors.full_messages}, status: :unprocessable_entity
    end

  end
  private

  def mark_params
    params.require(:mark).permit(:subject,:score)
  end

  def require_admin_or_teacher!
    unless current_user.role.in?(%w[admin teacher])
     return render json: {error: "Unauthorized"}, status: :unauthorized
    end
  end

end
