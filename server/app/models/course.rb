class Course < ApplicationRecord
  validates :title, :url, presence: true
end
