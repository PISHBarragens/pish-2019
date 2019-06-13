class Address < ApplicationRecord
  acts_as_paranoid
  
  belongs_to :user

  acts_as_mappable :distance_field_name => :range,
                   :lat_column_name => :lat,
                   :lng_column_name => :lng

  
end