class Notification
	class PushNotification

		def self.push(notification)

      if notification.user.authentications.last.metadata[:device_os]
        case notification.user.device[:os]
        when "android"
          send_fcm_push(notification, notification.user.authentications.last.metadata[:device_id])
        when "ios"
          send_ios_push(notification, notification.user.authentications.last.metadata[:device_id])
        end
      end

		end

		private

			def self.send_ios_push(notification, device_id)
				push_notification = Houston::Notification.new(
					device: device_id,
					alert: notification.title,
					sound: "sosumi.aiff",
					notification_type: notification.notification_type,
					badge: Notification.where(user_id: notification.user.id, read: false).size
				)

        APN.push(push_notification)
			end

			def self.send_fcm_push(notification, device_id)
				options = {
					data: {
						id: notification.id,
						alert: notification.title
					}
				}

				FCM_PUSHER.send([device_id], options)
			end

	end
end
