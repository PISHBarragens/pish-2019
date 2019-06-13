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



  def self.get_near_users(lat, lng)
    @addresses = Address.within(5, :units => :kms, :origin => [lat, lng])
    @users = []
    @addresses.each do |a|
      @users.push(User.joins(:addresses).where(addresses:{lat: a.lat, lng: a.lng}).first)
    end
    return @users
  end
end
