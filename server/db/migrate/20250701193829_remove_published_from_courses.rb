class RemovePublishedFromCourses < ActiveRecord::Migration[8.0]
  def change
    remove_column :courses, :published, :boolean
  end
end
