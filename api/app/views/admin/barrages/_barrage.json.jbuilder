json.partial! "admin/basic_barrage", basic_barrage: barrage
json.description barrage.description
json.photo barrage.image
json.nivels barrage.barrage_nivels.order(created_at: :desc).limit(15) do |data|
  json.moisture data.moisture
  json.vibration data.vibration
end