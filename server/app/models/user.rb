class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
  has_many :marks, dependent: :destroy
  has_many :attendances, dependent: :destroy
  ROLES = %w[admin student teacher].freeze

  after_initialize :set_default_role, if: :new_record?

  validates :role, inclusion: {in: ROLES}

  private

  def set_default_role
    self.role ||= 'student'
  end

end
