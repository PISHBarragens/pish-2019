class Notification < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  enum notification_type: [ :alert, :emergency ]
  validates :title, :message, presence: true

  def self.send_notifications(user, notification)
    if notification == 1 
      self.notify_alert(user, "A barragem corre risco de desmoronamento")
    else
      self.notify_emergency(user, "A barragem esta com niveis elevados, evacue a area")
    end
  end

  def self.notify_alert(user, message)
    notificate_and_push({
      title: "Alerta",
      message: message,
      user_id: user.id,
      notification_type: Notification.notification_types[:alert]
    })
  end


  def self.notify_emergency(user, message)
    notificate_and_push({
      title: "CORREE!!!",
      message: message,
      user_id: user.id,
      notification_type: Notification.notification_types[:emergency]
    })
  end


  private

  def self.notificate_and_push(notification_parameters)
    notification = Notification.new(notification_parameters)
    PushNotification.push(notification) if notification.save
  end
end
