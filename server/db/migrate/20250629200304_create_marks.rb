class CreateMarks < ActiveRecord::Migration[8.0]
  def change
    create_table :marks do |t|
      t.references :user, null: false, foreign_key: true
      t.string :subject
      t.integer :score

      t.timestamps
    end
  end
end
