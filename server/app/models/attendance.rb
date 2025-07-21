class Attendance < ApplicationRecord
  belongs_to :user
  validate :only_students_allowed

  private
  def only_students_allowed
    errors.add(:user,"must be a student") unless user&.role == "student"
  end
end
