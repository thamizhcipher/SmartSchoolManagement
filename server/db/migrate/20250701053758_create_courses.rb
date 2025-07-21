class CreateCourses < ActiveRecord::Migration[8.0]
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.string :url
      t.boolean :published

      t.timestamps
    end
  end
end
