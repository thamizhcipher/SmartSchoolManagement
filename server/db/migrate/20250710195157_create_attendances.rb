class CreateAttendances < ActiveRecord::Migration[8.0]
  def change
    create_table :attendances do |t|
      t.references :user, null: false, foreign_key: true
      t.date :attendance_date
      t.boolean :present

      t.timestamps
    end
  end
end
