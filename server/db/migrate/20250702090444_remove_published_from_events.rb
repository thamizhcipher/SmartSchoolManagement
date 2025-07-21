class RemovePublishedFromEvents < ActiveRecord::Migration[8.0]
  def change
    remove_column :events, :published, :boolean
  end
end
