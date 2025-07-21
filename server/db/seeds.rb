# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# SEEDING MARKS

# subjects = ["English", "Tamil", "Maths", "Science", "Social"]
# students = User.where(role: 'student')

# students.each do |student|
#   subjects.each do |sub|
#     Mark.create!(
#       user_id: student.id,
#       subject: sub,
#       score: rand(60..100)
#     )
#   end
# end
# 

#SEEDING ATTENDANCE
User.where(role: "student").each do |student|
  7.times do |i|
    Attendance.create!(
      user: student,
      attendance_date: Date.today - i,
      present: [true, false].sample
    )
  end
end