import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export class AddressService {
  static async list() {
    return axios({
      method: 'GET',
      url: `http://18.217.252.7:80/api/v1/addresses`,
      headers: {
        "access-token": await AsyncStorage.getItem("access-token"),
        "client": await AsyncStorage.getItem("client"),
        "resource-type": await AsyncStorage.getItem("resource-type"),
        "uid": await AsyncStorage.getItem("uid"),
      }
    })
  }

  static async create(address) {
    return axios({
      method: 'POST',
      url: `http://18.217.252.7:80/api/v1/addresses`,
      data: address,
      headers: {
        "access-token": await AsyncStorage.getItem("access-token"),
        "client": await AsyncStorage.getItem("client"),
        "resource-type": await AsyncStorage.getItem("resource-type"),
        "uid": await AsyncStorage.getItem("uid"),
      }
    })
  }
}