import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export class NotificationService {
  static async list() {
    return axios({
      method: 'GET',
      url: `http://18.217.252.7:80/api/v1/notifications`,
      headers: {
        "access-token": await AsyncStorage.getItem("access-token"),
        "client": await AsyncStorage.getItem("client"),
        "resource-type": await AsyncStorage.getItem("resource-type"),
        "uid": await AsyncStorage.getItem("uid"),
      }
    })
  }
}