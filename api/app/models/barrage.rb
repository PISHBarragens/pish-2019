class Barrage < ApplicationRecord
  acts_as_paranoid

  require 'mqtt'
  require 'uri'
  require 'timeout'

  has_many :barrage_nivels

  acts_as_mappable :distance_field_name => :range,
                   :lat_column_name => :lat,
                   :lng_column_name => :lng

  scope :search, -> (address) {
    self.within(5, :units => :kms, :origin => [address.lat, address.lng]).first
  }

  def self.connect_cloud_mqtt
    while true do
      self.get_mqtt_data(Barrage.first, "umidade")
      # self.get_mqtt_data(Barrage.first, "vibracao")
      sleep 5
    end
  end

  def self.get_mqtt_data(barrage, nivel)
    uri =  URI.parse 'https://api.cloudmqtt.com/'
    conn_opts = {
      host: 'm16.cloudmqtt.com',
      port: '11838',
      username: 'srtwrzni',
      password: 'yrKsU5rSgsVm'
    }

    topic = "barragem/#{nivel}"

    # Subscribe example
    MQTT::Client.connect(conn_opts) do |c|
      Timeout::timeout(5) do
        c.get(topic) do |t, message|
          b = BarrageNivel.new(barrage_id: barrage.id)
          case nivel
          when "umidade"
            b.moisture = message
            if message.to_i >= 20
              users = User.get_near_users(barrage.lat, barrage.lng)
              users.each do |user|
                # if user.notifications.empty? || (user.notifications.any? && user.notifications.last.created_at.to_date != (DateTime.now + 3.hours).to_date)
                  Notification.send_notifications(user, 1)
                # end
              end
            end
          else
            b.vibration = message
          end
          b.save
          return b
        end
      end
    end
  end
end
