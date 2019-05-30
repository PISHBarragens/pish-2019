class Api::V1::NotificationsController < API::V1::BaseController
  before_action :authenticate_user!
  before_action :set_notification, only:[:show]

  def index
    @notifications = current_user.notifications
  end

  def show
  end

  private
  def set_notification
    @notification = Notification.find(params[:id])
  end
end
