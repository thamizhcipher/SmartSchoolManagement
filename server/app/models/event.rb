class Event < ApplicationRecord
  validates :date, :title, presence: true
end
