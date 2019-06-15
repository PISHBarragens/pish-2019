import axios from 'axios';

export class UserService {
  static login(email, password, notificationId, deviceOs) {
    return axios({
      method: 'POST',
      url: `http://18.217.252.7:80/api/v1/users/auth/sign_in`,
      data: {
        auth: email,
        password: password,
        device_id: notificationId,
        device_os: deviceOs
      }
    });
  }

  static create(user) {
    return axios({
      method: 'POST',
      url: `http://18.217.252.7:80/api/v1/users`,
      data: user,
    });
  }

  static listNotifications() {
    return axios({
      method: 'GET',
      url: `http://18.222.174.14:80/admin/barrages`,
    });
  }
}