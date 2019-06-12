class User < ApplicationRecord
  acts_as_paranoid
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include Authenticatable

  has_many :addresses
  has_many :notifications
  accepts_nested_attributes_for :addresses, allow_destroy: true

end
