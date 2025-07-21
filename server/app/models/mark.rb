class Mark < ApplicationRecord
  belongs_to :user
  validates :subject, :score, presence: true
end
