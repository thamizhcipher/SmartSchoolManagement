class Api::V1::CoursesController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :require_admin!, except: [:index]

  def index
    courses = Course.all
    puts courses
    return render json: {courses:courses}, status: :ok
  end

  def create
    course = Course.new(course_params)
    if course.save
      return render json: {message: "Course created successfully"}, status: :created
    else
      return render json: {errors: course.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    course = Course.find_by(id: params[:id])
    if course.update(course_params)
      render json: {messages: "Updated successfully"}, status: :ok 
    else
      render json: {error:course.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    course = Course.find_by(id: params[:id])
    if course.destroy
      render json: {messages: "Deleted successfully"}, status: :no_content
    else
      render json: {errors: course.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def course_params
    params.require(:course).permit(:title,:description,:url)
  end

  def require_admin!
    return render json: {error:"unauthorized"}, status: :unauthorized unless current_user.role == "admin"
  end
end
