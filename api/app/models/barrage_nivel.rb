class BarrageNivel < ApplicationRecord
  acts_as_paranoid
  
  belongs_to :barrage
end
